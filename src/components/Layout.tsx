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
  const router = useRouter();
  const { pathname, asPath, query } = router;

  // Default props can't be translated at module level because active locale
  // isn't known when module is imported, but rather when component
  // is rendered.
  if (title == null) {
    title = t`No title`;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classnames(styles.main, className)}>{children}</main>
    </div>
  );
}
