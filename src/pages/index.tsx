import styles from './index.module.css';
import { Layout } from '../components/Layout';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import LocalImage from '../components/LocalImage';
import { Button } from '../components/Button';
import { PageSectionHowItWorks } from '../components/PageSectionHowItWorks';
import { StickyHeader } from '../components/StickyHeader';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';
import { useLink } from '../common/useLink';
import { CommunityComposition } from '../components/ComunityComposition';
import { AppStoreButtons } from '../components/AppStoreButtons';

export default function Home() {
  const { i18n } = useLingui();

  const { makeLinkParams } = useLink();

  const faqLinkParams = useMemo<Url>(() => makeLinkParams('/faq'), []);

  const [titleStep, setTitleStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleStep(step => (step + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout
      resetMain={true}
      className={styles.container}
      title={t(i18n)`One car, your community`}>
      <section
        className={classNames(styles.pageSection, styles.pageSectionSplash)}>
        <div className={styles.splashSectionLeft}>
          <div className={styles.splashSectionLeftInner}>
            <h1 className={styles.pageTitle}>
              <Trans>Share the car of your</Trans>{' '}
              <div
                className={styles.titleCarousel}
                style={{
                  // @ts-ignore
                  '--title-step': titleStep,
                }}>
                <span>
                  <Trans>neighbour</Trans>
                </span>
                <span>
                  <Trans>friend</Trans>
                </span>
                <span>
                  <Trans>family</Trans>
                </span>
              </div>
            </h1>
            <span>
              <Trans>Save by using your car with your community.</Trans>
            </span>
            <div>
              <AppStoreButtons buttonClass={styles.downloadButton} />
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
        <figure className={styles.composition}>
          <CommunityComposition />
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
              <Trans>
                Everything you need to share your car with e.g. your neighbors,
                friends or family. Conveniently in one app.
              </Trans>
            </p>
          </header>
        </div>
        <section className={styles.features}>
          {[
            {
              title: t(i18n)`Manage availability`,
              subtext: t(i18n)`Request and approve/deny trips in the app`,
              image: '/images/mockup-reservation.png',
              icon: '/images/icon-calendar.svg',
            },
            {
              title: t(i18n)`You determine the price`,
              subtext: t(
                i18n,
              )`With Cabble sharing can be a win-win for everyone. Fuel costs? Just add them to the bill. Easy!`,
              image: '/images/mockup-payments2.png',
              icon: '/images/icon-wallet.svg',
              buttonText: t(i18n)`Open cost calculator`,
              buttonLink: '/calculator',
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
                  <Link
                    href={
                      feature.buttonLink
                        ? makeLinkParams(feature.buttonLink)
                        : faqLinkParams
                    }>
                    <Button
                      element={null}
                      className={styles.readMore}
                      variant={'outline-blue'}>
                      {feature.buttonText || <Trans>Learn more</Trans>}
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
                  Soon you will be able to insure for any self-incurred damage
                  that might occur during a trip.
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
              )`Drivers save on cost of ownership and owners get money to cover their costs.`,
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
