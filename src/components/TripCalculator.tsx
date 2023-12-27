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

  const [hours, setHours] = useState([2, 4, 8, 36]);
  const [kilometers, setKilometers] = useState([20, 150, 300]);

  const hourlyRate = watch('hourlyRate');
  const kilometerRate = watch('kilometerRate');
  const freeKilometers = watch('freeKilometers');

  const currency = 'EUR';

  const { makeLinkParams } = useLink();

  return (
    <div className={classNames(styles.container, className)}>
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
            {[0.15, 0.2, 0.25].map(option => (
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
            {[0, 50, 100].map(option => (
              <option value={option}>{option} km</option>
            ))}
          </select>
        </label>
      </form>
      <table>
        <thead>
          <tr>
            <th></th>
            {hours.map(hours => (
              <th>{hours} h</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {kilometers.map(kilometers => (
            <tr>
              <td>
                <strong>{kilometers} km</strong>
              </td>
              {hours.map(hours => (
                <td>
                  {formatInCurrency(
                    hours *
                      Math.max(1, Math.floor(hours / 24)) *
                      parseFloat(hourlyRate) +
                      Math.max(0, kilometers - parseFloat(freeKilometers)) *
                        parseFloat(kilometerRate),
                    { currency },
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
