import { Controller, useForm } from 'react-hook-form';
import styles from './TripCalculator.module.css';
import { Trans } from '@lingui/macro';
import { useState } from 'react';
import { useNumberFormat } from '../common/useNumberFormat';
import Link from 'next/link';
import { useLink } from '../common/useLink';
import classNames from 'classnames';

interface CalculatorFormValues {
  hourlyRate: string;
  kilometerRate: string;
  freeKilometers: string;
}

export const TripCalculator = ({ className }: { className?: string }) => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<CalculatorFormValues>({
    defaultValues: {
      hourlyRate: '2.2',
      kilometerRate: '0.15',
      freeKilometers: '100',
    },
  });

  const { formatInCurrency } = useNumberFormat();

  const [hours, setHours] = useState([2, 4, 8]);
  const [kilometers, setKilometers] = useState([20, 150, 300]);

  const hourlyRate = watch('hourlyRate');
  const kilometerRate = watch('kilometerRate');
  const freeKilometers = watch('freeKilometers');

  const currency = 'EUR';

  const { makeLinkParams } = useLink();

  return (
    <div className={classNames(styles.container, className)}>
      <header>
        <h2>
          <Trans>Determine your price</Trans>
        </h2>
        <p>
          <Trans>
            These settings are also found in the app when the owner creates a
            car profile. Based on what is known about the car, the app will do a
            suggestion, but the owner is free to change these values.
          </Trans>
        </p>
      </header>
      <form>
        <Controller
          control={control}
          name="hourlyRate"
          render={({ field }) => (
            <label className={styles.hourlyRate} htmlFor="hourlyRate">
              <output>
                {formatInCurrency(parseFloat(field.value), { currency })}
              </output>
              <span className={styles.perDay}>
                <Trans>per hour (max. 10 hours per day)</Trans>
              </span>
              <input type="range" min="1" max="5" step={0.1} {...field} />
              <div className={styles.sub}>
                <span>low</span>
                <span>high</span>
              </div>
            </label>
          )}
        />
        <label className={styles.select} htmlFor="kilometerRate">
          <Trans>
            Price per kilometer <Link href={makeLinkParams('/faq')}>(?)</Link>
          </Trans>
          <select {...register('kilometerRate')}>
            {Array.from({
              length: 11,
            })
              .map((_, i) => 0.15 + 0.01 * i)
              .map(option => (
                <option value={option}>
                  {formatInCurrency(option, { currency })}
                </option>
              ))}
          </select>
        </label>
        <label className={styles.select} htmlFor="freeKilometers">
          <Trans>Free kilometers per day</Trans>{' '}
          <Link href={makeLinkParams('/faq')}>(?)</Link>
          <select {...register('freeKilometers')}>
            {[0, 50, 100, 150, 200, 300, 1000].map(option => (
              <option value={option}>{option} km</option>
            ))}
          </select>
        </label>
      </form>
      <h2>
        <Trans>Trip costs</Trans>
      </h2>
      <p>
        <Trans>
          Based on the settings above, the following table shows the cost of a
          trip excluding fuel. On the left side of the table the number of
          kilometers driven and on the top the number of hours the car is used.
        </Trans>
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            {hours.slice(0, hours.length - 1).map(hours => (
              <th>{hours} h</th>
            ))}
            <th>
              <div>
                <input
                  type="number"
                  value={hours[hours.length - 1]}
                  onChange={e =>
                    setHours([
                      ...hours.slice(0, hours.length - 1),
                      parseInt(e.target.value),
                    ])
                  }
                />{' '}
                h
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {kilometers.map((kilometer, index) => {
            const isLast = index === kilometers.length - 1;
            return (
              <tr>
                <td>
                  {!isLast ? (
                    <strong>{kilometer} km</strong>
                  ) : (
                    <div>
                      <input
                        onChange={e =>
                          setKilometers([
                            ...kilometers.slice(0, kilometers.length - 1),
                            parseInt(e.target.value),
                          ])
                        }
                        type="number"
                        value={kilometer}
                      />
                      <strong> km</strong>
                    </div>
                  )}
                </td>
                {hours.map(hours => {
                  const numberOfDays = Math.max(1, Math.floor(hours / 24));
                  const freeKm = numberOfDays * parseFloat(freeKilometers);
                  const km = Math.max(0, kilometer - freeKm);
                  const hoursCharged = (numberOfDays - 1) * 10 + (hours % 24);
                  const price =
                    hoursCharged * parseFloat(hourlyRate) +
                    km * parseFloat(kilometerRate);
                  return (
                    <td>
                      {isNaN(price)
                        ? '?'
                        : formatInCurrency(price, { currency })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
