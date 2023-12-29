import styles from './PageSectionHowItWorks.module.css';
import classNames from 'classnames';
import { useEffect, useMemo, useState, WheelEvent } from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useInView } from 'react-intersection-observer';
import throttle from 'lodash.throttle';

export const PageSectionHowItWorks = ({
  className,
}: {
  className?: string;
}) => {
  const { i18n } = useLingui();

  const [mode, setMode] = useState<'owner' | 'driver'>('owner');

  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(
    () =>
      mode === 'driver'
        ? [
            {
              title: t(i18n)`Download the app 📱`,
              subtext: t(i18n)`Download the app for free.`,
            },
            {
              title: t(i18n)`Create a profile 🙋‍️`,
              subtext: t(i18n)`Add some basic information about yourself.`,
            },
            {
              title: t(i18n)`Link with an owner 💌`,
              subtext: t(i18n)`Invite an owner or get invited.`,
            },
            {
              title: t(i18n)`Let's go! 🚀`,
              subtext: t(i18n)`You're all set! Now you can start sharing.`,
            },
          ]
        : [
            {
              title: t(i18n)`Download the app 📱`,
              subtext: t(i18n)`Download the app for free.`,
            },
            {
              title: t(i18n)`Create a car profile 🙋‍`,
              subtext: t(
                i18n,
              )`Follow the onboarding to add your car to the app.`,
            },
            {
              title: t(i18n)`Invite your community 💌`,
              subtext: t(
                i18n,
              )`Invite drivers by using a sharing link with useful information for drivers.`,
            },
            {
              title: t(i18n)`Let's go! 🚀`,
              subtext: t(i18n)`You're all set! Now you can start sharing.`,
            },
          ],
    [mode],
  );

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const listener = throttle(() => {
      if (!entry) {
        return;
      }
      const boundingClientRect = entry.target.getBoundingClientRect();
      const midOfViewPort = window.innerHeight / 2;
      const midOfElement =
        boundingClientRect.top + boundingClientRect.height / 2;
      const scrollPercentage =
        ((midOfViewPort - midOfElement) / boundingClientRect.height) * 1.5;
      setStepIndex(
        Math.round(
          Math.min(Math.max(0, scrollPercentage), 1) * (steps.length - 1),
        ),
      );
    }, 100);
    if (inView) {
      document.addEventListener('scroll', listener);
    }
    return () => document.removeEventListener('scroll', listener);
  }, [inView, steps]);

  return (
    <section ref={ref} className={classNames(className, styles.container)}>
      <div
        className={styles.background}
        style={{
          // @ts-ignore
          '--bg-step': stepIndex,
        }}
      />
      <div className={styles.content}>
        <div className={styles.titleAndSwitch}>
          <h2>
            <Trans>How it works</Trans>
          </h2>
          <div className={styles.ownerDriverSwitch}>
            <button
              onClick={() => setMode('owner')}
              className={mode === 'owner' ? styles.active : undefined}>
              <Trans>I have a car</Trans>
            </button>
            <button
              onClick={() => setMode('driver')}
              className={mode === 'driver' ? styles.active : undefined}>
              <Trans>I want to use a car</Trans>
            </button>
          </div>
        </div>
        <ul className={styles.steps}>
          {steps.map((step, index) => (
            <li
              className={classNames(
                styles.step,
                stepIndex === index && styles.activeStep,
              )}
              style={{
                // @ts-ignore
                '--step-index': stepIndex,
              }}>
              <div className={styles.stepNumbers}>
                {index !== 3 ? `0${index + 1}.` : ''}
                {index !== 3 && <span className={styles.stepSeparator} />}
                04.
              </div>
              <div className={styles.stepTitle}>{step.title}</div>
              <p>{step.subtext}</p>
            </li>
          ))}
        </ul>
        <div className={styles.buttons}>
          <button
            className={classNames(
              styles.prevButton,
              styles.button,
              stepIndex === 0 && styles.disabledButton,
            )}
            onClick={() => setStepIndex(Math.max(stepIndex - 1, 0))}
          />
          <button
            className={classNames(
              styles.nextButton,
              styles.button,
              stepIndex === steps.length - 1 && styles.disabledButton,
            )}
            onClick={() => setStepIndex(Math.min(stepIndex + 1, 3))}
          />
        </div>
      </div>
    </section>
  );
};
