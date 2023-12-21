import Head from 'next/head';
import classnames from 'classnames';

import styles from './Layout.module.css';
import { t, Trans } from '@lingui/macro';
import Link from 'next/link';
import { useLingui } from '@lingui/react';
import { Button } from './Button';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useGetEarlyAccess } from '../common/useGetEarlyAccess';
import { useLink } from '../common/useLink';

export function Layout({
  title = null,
  ogImage,
  className = '',
  children,
  showHeaderAndFooter = true,
  resetMain = !showHeaderAndFooter,
}: {
  title?: string | null;
  ogImage?: string;
  className?: string;
  children: React.ReactNode;
  showHeaderAndFooter?: boolean;
  resetMain?: boolean;
}) {
  const pathname = usePathname();

  const { i18n } = useLingui();

  const { showPopup } = useGetEarlyAccess();

  const { makeLinkParams } = useLink();

  return (
    <div className={classnames(showHeaderAndFooter && styles.container)}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Work+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        <meta property="og:image" content={ogImage} />
      </Head>

      {showHeaderAndFooter && (
        <header className={styles.header}>
          <Link href={makeLinkParams('/')}>
            <img className={styles.logo} src="/images/logo.svg" />
          </Link>
          <ul className={styles.menu}>
            {[
              {
                href: '/faq',
                label: t(i18n)`FAQ`,
              },
              {
                href: '/support',
                label: t(i18n)`Support`,
              },
            ].map(({ href, label }) => (
              <li
                className={classNames(
                  pathname === href && styles.activeMenuItem,
                )}>
                <Link
                  href={{
                    pathname: href,
                    query: {
                      lang: i18n.locale,
                    },
                  }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </header>
      )}

      <main className={classnames(!resetMain && styles.main, className)}>
        {children}
      </main>

      {showHeaderAndFooter && (
        <>
          <section className={styles.downloadSection}>
            <div className={styles.downloadSectionInner}>
              <h2>
                <Trans>Let's do this?</Trans>
              </h2>

              <div className={styles.subText}>
                1. Download 2. Create an account 3. Invite ...🚀
              </div>

              <div>
                <Button
                  element={'button'}
                  variant="outline-blue"
                  size={'lg'}
                  className={styles.button}
                  onClick={() => showPopup()}>
                  <Trans>Get early access</Trans>
                </Button>
              </div>
            </div>
          </section>

          <footer className={styles.footer}>
            <div className={styles.grid}>
              <div>
                <h3>
                  <Trans>Menu</Trans>
                </h3>
                <ul className={styles.footerMenu}>
                  {[
                    {
                      href: '/faq',
                      label: t(i18n)`Frequently Asked Questions`,
                    },
                    {
                      href: '/support',
                      label: t(i18n)`Support`,
                    },
                  ].map(({ href, label }) => (
                    <li>
                      <Link href={makeLinkParams(href)}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>
                  <Trans>Legal</Trans>
                </h3>
                <ul className={styles.footerMenu}>
                  {[
                    {
                      href: '/privacy-policy',
                      label: t(i18n)`Privacy Policy`,
                    },
                    {
                      href: '/terms-and-conditions',
                      label: t(i18n)`Terms and Conditions`,
                    },
                  ].map(({ href, label }) => (
                    <li>
                      <Link href={makeLinkParams(href)}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>
                  <Trans>Our mission</Trans>
                </h3>
                <p className={styles.missionStatement}>
                  <Trans>
                    Cabble is on a mission to bring together communities in
                    order to reduce the number of cars on the streets
                    collectively.
                  </Trans>
                </p>
              </div>
            </div>

            <img src="images/logo-footer.svg" alt="" />
          </footer>
        </>
      )}
    </div>
  );
}
