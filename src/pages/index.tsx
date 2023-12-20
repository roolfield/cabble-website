import styles from './index.module.css';
import { Layout } from '../components/Layout';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import React, { useMemo } from 'react';
import classNames from 'classnames';
import LocalImage from '../components/LocalImage';
import { Button } from '../components/Button';
import { PageSectionHowItWorks } from '../components/PageSectionHowItWorks';
import { StickyHeader } from '../components/StickyHeader';
import { useGetEarlyAccess } from '../common/useGetEarlyAccess';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';
import { useLink } from '../common/useLink';

export default function Home() {
  const { i18n } = useLingui();

  const { showPopup } = useGetEarlyAccess();

  const { makeLinkParams } = useLink();

  const faqLinkParams = useMemo<Url>(() => makeLinkParams('/faq'), []);

  return (
    <Layout
      resetMain={true}
      className={styles.container}
      title={t(i18n)`Cabble car sharing app`}>
      <section
        className={classNames(styles.pageSection, styles.pageSectionSplash)}>
        <div className={styles.splashSectionLeft}>
          <div className={styles.splashSectionLeftInner}>
            <h1 className={styles.pageTitle}>
              <Trans>One car, your community</Trans>
            </h1>
            <span>
              <Trans>
                Share your underutilized car with a trusted group of people.
              </Trans>
            </span>
            <div>
              <Button
                size={'lg'}
                variant="outline-white"
                onClick={() => showPopup()}
                className={styles.button}>
                <Trans>Get early access</Trans>
              </Button>
            </div>
          </div>
        </div>
        <figure className={styles.hero}>
          <LocalImage
            src="/images/hero_mockup.png"
            width={344}
            height={735}
            lazy={false}
            sizes={`(max-width: 344px) 100vw, 344px`}
          />
        </figure>
      </section>
      <section
        className={classNames(styles.pageSection, styles.pageSectionTogether)}>
        <figure>
          <LocalImage
            src="/images/community.png"
            width={613}
            height={447}
            lazy={false}
            sizes={`(max-width: 655px) 100vw, 650px`}
          />
        </figure>
        <div className={styles.togetherText}>
          <header>
            <h2>
              <Trans>
                Sharing made easy in{' '}
                <span className={styles.accent}>one app</span>
              </Trans>
            </h2>
            <p className={styles.subText}>
              Everything you need to share your car with e.g. your neighbors,
              friends or family. Conveniently in one app.
            </p>
          </header>
        </div>
        <section className={styles.features}>
          {[
            {
              title: t(i18n)`Manage availability`,
              subtext: t(
                i18n,
              )`Request and approve/deny reservations in the app`,
              image: '/images/mockup-reservation.png',
              icon: '/images/icon-calendar.svg',
            },
            {
              title: t(i18n)`Automatic payments from owner to driver`,
              subtext: t(
                i18n,
              )`Pay after a reservation has ended. Fuel costs? These can be added too. Easy!`,
              image: '/images/mockup-payments.png',
              icon: '/images/icon-wallet.svg',
            },
            {
              title: t(i18n)`Everything in one place`,
              subtext: t(
                i18n,
              )`Anything to discuss? Use chat to keep each other in the loop.`,
              image: '/images/mockup-chat.png',
              icon: '/images/icon-chat.svg',
            },
          ].map(feature => (
            <div className={styles.feature}>
              <div className={styles.featureLeft}>
                <div>
                  <img className={styles.featureIcon} src={feature.icon} />
                  <h3>{feature.title}</h3>
                </div>
                <p className={styles.subText}>{feature.subtext}</p>
                <div>
                  <Link href={faqLinkParams}>
                    <Button
                      element={null}
                      className={styles.readMore}
                      variant={'outline-blue'}>
                      <Trans>Learn more</Trans>
                    </Button>
                  </Link>
                </div>
              </div>
              <figure>
                <LocalImage
                  src={feature.image}
                  width={430}
                  height={806}
                  sizes={`(max-width: 430px) 100vw, 430px`}
                />
              </figure>
            </div>
          ))}
          <div className={styles.feature}>
            <div className={styles.featureLeft}>
              <div>
                <img
                  className={styles.featureIcon}
                  src={'/images/icon-nn.png'}
                />
                <span className={styles.soon}>
                  <Trans>Coming soon</Trans>
                </span>
                <h3>
                  <Trans>Insurance for any damage</Trans>
                </h3>
              </div>
              <p className={styles.subText}>
                <Trans>
                  Soon you will be able to insure for any damage that might
                  occur during a reservation.
                </Trans>
              </p>
            </div>
          </div>
        </section>
      </section>
      <PageSectionHowItWorks className={styles.pageSection} />
      <section className={classNames(styles.sectionUsps, styles.pageSection)}>
        <StickyHeader minWidth={1200}>
          <h2>
            <Trans>Why sharing with Cabble?</Trans>
          </h2>
        </StickyHeader>
        <div className={styles.usps}>
          {[
            {
              title: t(i18n)`Share with those you trust`,
              icon: '/images/usp-community.svg',
              subtext: t(
                i18n,
              )`You can be friends, neighbours or family; share your car with a trusted community.`,
            },
            {
              title: t(i18n)`Save money, everyone`,
              icon: '/images/usp-financial.svg',
              subtext: t(
                i18n,
              )`Drivers save on cost of ownership and owners get some of it back. Moreover, with a fee of only 6,5% Cabble has the lowest fees (by far).`,
            },
            {
              title: t(i18n)`Flexible`,
              icon: '/images/usp-flexible.svg',
              subtext: t(
                i18n,
              )`Going for a weekend trip? Or just a trip to IKEA? Decide together for how long and when.`,
            },
            {
              title: t(i18n)`Good for our planet`,
              icon: '/images/usp-planet.svg',
              subtext: t(
                i18n,
              )`Sharing a car means less cars on the road, which means less emissions and more space in our cities.`,
            },
          ].map(item => (
            <div className={styles.usp}>
              <img className={styles.uspIcon} src={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.subtext}</p>
              <div>
                <Link href={faqLinkParams}>
                  <Button element={null} variant={'outline-blue'}>{t(
                    i18n,
                  )`Learn more`}</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
