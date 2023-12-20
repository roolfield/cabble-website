import styles from './redirect.module.css';
import '@splidejs/react-splide/css/core';

import { t, Trans } from '@lingui/macro';

import { Layout } from '../../components/Layout';
import { useLingui } from '@lingui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';

export default function DriverShareRequest() {
  const { i18n } = useLingui();

  const { query } = useRouter();

  const [isRedirecting, setIsRedirecting] = useState<boolean>();

  const loadingDots = useState<string>('');

  useEffect(() => {
    if (!query.pairingCode) {
      return;
    }

    window.location.href =
      `${process.env.NEXT_PUBLIC_APP_SCHEME}pairing/` + query.pairingCode;
  }, []);

  const userAgent = navigator.userAgent;
  const isAndroid = true;
  const isIphone = userAgent.match(/iPhone/);

  useEffect(() => {
    setTimeout(() => {
      setIsRedirecting(!!isAndroid || !!isIphone);
    }, 2000);
  }, []);

  useEffect(() => {
    window.location.href = `${process.env.NEXT_PUBLIC_APP_SCHEME}${location}`;
  }, []);

  useEffect(() => {
    if (isRedirecting) {
      setTimeout(function () {
        if (isIphone) {
          window.location.href = `https://apps.apple.com/app/id{${process.env.NEXT_PUBLIC_APP_ID_APPLE}}`;
        } else if (isAndroid) {
          window.location.href = `https://play.google.com/store/apps/details?id={${process.env.NEXT_PUBLIC_APP_ID_ANDROID}}`;
        }
      }, 2000);
    }
  }, [isRedirecting]);

  useEffect(() => {
    setTimeout(() => {
      loadingDots[1](dots => {
        if (dots.length > 2) {
          return '';
        }

        return dots + '.';
      });
    }, 500);
  });

  return (
    <Layout
      className={classnames(styles.container, styles.redirectContainer)}
      title={t(i18n)`Use pairing code - Cabble`}>
      <h1>
        <Trans>Let's go 🚀</Trans>
      </h1>

      <header className={styles.subSectionHeader}>
        <h2 className={styles.redirectText}>
          <>
            {!isRedirecting && <Trans>Trying to open the app</Trans>}
            {isRedirecting && (
              <Trans>
                Redirecting you to the {isAndroid ? 'Play Store' : 'App store'}
              </Trans>
            )}
            {loadingDots}
          </>
        </h2>
      </header>

      <header className={styles.subSectionHeader}>
        <h3>
          <Trans>Download the app for free</Trans>
        </h3>
      </header>

      <p>
        <Trans>
          You can start sharing once both of you have the app installed.
        </Trans>
      </p>

      <div className={styles.appStoreButtons}>
        <a href="" className={styles.playStoreButton} />
        <a href="" className={styles.appStoreButton} />
      </div>
    </Layout>
  );
}
