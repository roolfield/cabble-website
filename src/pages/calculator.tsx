import styles from './calculator.module.css';
import { Layout } from '../components/Layout';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import React from 'react';
import { TripCalculator } from '../components/TripCalculator';
import Link from 'next/link';
import { useLink } from '../common/useLink';

export default function Support() {
  const { i18n } = useLingui();

  const { makeLinkParams } = useLink();

  return (
    <Layout title={t(i18n)`Support`} className={styles.container}>
      <header>
        <h1>
          <Trans>Trip cost calculator</Trans>
        </h1>
        <p className={styles.instructions}>
          <Trans>
            Use this calculator to calculate the cost of a trip for a driver
            when you use Cabble. To learn more about trip pricing, refer to the{' '}
            <Link href={makeLinkParams('/faq')}>FAQ</Link>.
          </Trans>
        </p>
      </header>
      <aside>
        <TripCalculator className={styles.calculator} />
      </aside>
    </Layout>
  );
}
