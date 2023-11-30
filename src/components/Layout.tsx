import Head from 'next/head';
import classnames from 'classnames';

import { t } from '@lingui/macro';

import styles from './Layout.module.css';
import { useLingui } from '@lingui/react';
import { useRouter } from 'next/router';

export function Layout({ title = null, className = '', children }) {
  /**
   * This hook is needed to subscribe your
   * component for changes if you use t`` macro
   */
  useLingui();

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Work+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={classnames(styles.main, className)}>{children}</main>
    </div>
  );
}
