import styles from './sharing-request.module.css';
import '@splidejs/react-splide/css/core';

import { gql, request } from 'graphql-request';
import { t, Trans } from '@lingui/macro';

import { Layout } from '../../components/Layout';
import { useLingui } from '@lingui/react';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import ResponsiveImage from '../../components/ResponsiveImage';
import classnames from 'classnames';
import { Slider } from '../../components/Slider';
import { StickyHeader } from '../../components/StickyHeader';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Data {
  userProfile: {
    id: string;
    profilePicture: {
      url: string;
      metadata: {
        width: number;
        height: number;
      };
    };
    firstName: string;
    lastName: string;
  };
}

const query: TypedDocumentNode<Data, { driverId: string }> = parse(gql`
  query ($driverId: ID!) {
    userProfile(userId: $driverId) {
      id
      profilePicture {
        url
        metadata {
          ... on ImageFileMetadataView {
            width
            height
          }
        }
      }
      firstName
      lastName
    }
  }
`);

export default function DriverShareRequest() {
  const { i18n } = useLingui();

  const router = useRouter();

  const [data, setData] = useState<Data | undefined | null>();

  const [queryError, setQueryError] = useState<unknown>();

  const breakpoint = 44 * 14; // 44em

  useEffect(() => {
    if (!router.query.driverId) {
      return;
    }
    const variables = {
      driverId: router.query.driverId.toString(),
    };
    request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, query, variables)
      .then(profileData => {
        setData(profileData);
      })
      .catch(setQueryError);
  }, [router.query.driverId]);

  const pairingCode = Array.isArray(router.query.pairingCode)
    ? router.query.pairingCode[0]
    : router.query.pairingCode;

  const openPairingCode = useCallback(() => {
    if (!pairingCode) {
      alert('Invalid URL');
      return;
    }
    window.location.href = 'cabble://pairing/' + pairingCode;
  }, []);

  if (queryError || (data && !data.userProfile)) {
    return t(i18n)`Could not load the page`;
  }

  return (
    <Layout
      className={styles.container}
      ogImage={`${data?.userProfile.profilePicture.url}=s1200`}
      title={t(i18n)`Message from ${
        data?.userProfile.firstName ?? ''
      } on Cabble`}>
      <section className={styles.pageSection}>
        <StickyHeader minWidth={breakpoint}>
          <header
            className={classnames(styles.sectionHeader, styles.pageHeader)}>
            <div className={styles.headerAvatars}>
              <ResponsiveImage
                url={data?.userProfile.profilePicture.url}
                widths={[48, 96, 192]}
                sizes={`(max-width: ${breakpoint}) 3em, 4em`}
                width={data?.userProfile.profilePicture.metadata.width}
                height={data?.userProfile.profilePicture.metadata.height}
                className={styles.ownerPicture}
              />
              <span className={styles.cabbleLogo}>C</span>
            </div>
            <span>
              This is a message from {data?.userProfile.firstName ?? ''}{' '}
              {data?.userProfile.lastName ?? ''}
            </span>
            <h1 className={styles.pageTitle}>
              <Trans>Hey, do you want to share your car with me?</Trans>
            </h1>
          </header>
        </StickyHeader>

        <div className={styles.subSections}>
          <aside className={classnames(styles.subSection, styles.lgTitleTop)}>
            <figure>
              <ResponsiveImage
                url={data?.userProfile.profilePicture.url}
                widths={[600, 1000, 2000]}
                sizes={`(max-width: ${breakpoint}) 100vw, 31.5em`}
                width={data?.userProfile.profilePicture.metadata.width}
                height={data?.userProfile.profilePicture.metadata.height}
                className={styles.subSectionImage}
              />
            </figure>

            <header className={styles.subSectionHeader}>
              <span>
                <Trans>Hello!</Trans>
              </span>
              <h3>{`${data?.userProfile.firstName} ${data?.userProfile.lastName}`}</h3>
            </header>
          </aside>
        </div>
      </section>

      <section className={styles.pageSection}>
        <StickyHeader minWidth={breakpoint}>
          <header className={styles.sectionHeader}>
            <h2>
              <Trans>How would that work? 🤔</Trans>
            </h2>
          </header>
        </StickyHeader>

        <div className={styles.subSections}>
          <Slider
            className={styles.slider}
            prevText={t(i18n)`Sharing with Cabble`}
            nextText={t(i18n)`Costs`}>
            <aside className={styles.subSection}>
              <figure></figure>

              <div className={styles.sectionContent}>
                <header className={styles.subSectionHeader}>
                  <span>
                    <Trans>Sharing with Cabble</Trans>
                  </span>
                  <h3>
                    <Trans>
                      With Cabble we can share your car safely and without any
                      hassle.
                    </Trans>
                  </h3>
                </header>

                <div className={styles.subSectionContent}>
                  <ul className={styles.bulletList}>
                    <li>
                      <Trans>
                        I make a reservation for when I need it. After your
                        approval I start your trip in the app.
                      </Trans>
                    </li>
                    <li>
                      <Trans>
                        I Pay for each trip based on the time and distance I
                        drive.
                      </Trans>
                    </li>
                  </ul>

                  <a href="https://cabbleapp.com" className={styles.learnMore}>
                    Learn more
                  </a>
                </div>
              </div>
            </aside>

            <aside className={styles.subSection}>
              <figure></figure>

              <header className={styles.subSectionHeader}>
                <span>
                  <Trans>The costs</Trans>
                </span>
                <h3>
                  <Trans>
                    You get some of the costs back, I save the cost of
                    ownership.
                  </Trans>
                </h3>
              </header>

              <div className={styles.subSectionContent}>
                <ul className={styles.bulletList}>
                  <li>
                    <Trans>You set a price per hour.</Trans>
                  </li>
                  <li>
                    <Trans>
                      You could set a free number of kilometers per trip and a
                      price per extra kilometer.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      I refuel the car or I pay for the used fuel through the
                      app.
                    </Trans>
                  </li>

                  <a href="https://cabbleapp.com" className={styles.learnMore}>
                    Learn more
                  </a>
                </ul>
              </div>
            </aside>
          </Slider>
        </div>
      </section>

      <section className={styles.pageSection}>
        <StickyHeader minWidth={breakpoint}>
          <header className={styles.sectionHeader}>
            <h2>
              <Trans>Want to give it a try? 💪🏼</Trans>
            </h2>
          </header>
        </StickyHeader>

        <div className={styles.subSections}>
          <aside className={styles.subSection}>
            <div className={styles.sectionContent}>
              <header className={styles.subSectionHeader}>
                <h3>
                  <Trans>Already have the app? Use my pairing code.</Trans>
                </h3>
              </header>

              <p>
                <Trans>
                  This is your unique pairing code to add me as a driver to your
                  car.
                </Trans>
              </p>

              <div className={styles.pairingCode}>
                {!!pairingCode &&
                  pairingCode.split('').map(letter => <span>{letter}</span>)}
              </div>

              <button className={styles.pairButton} onClick={openPairingCode}>
                <Trans>Use pairing code</Trans>
              </button>

              <header className={styles.subSectionHeader}>
                <h3>
                  <Trans>Don't have the app yet? Download it for free!</Trans>
                </h3>
              </header>

              <p>
                <Trans>
                  You don't pay for using this app, why not give it a try?
                </Trans>
              </p>

              <div className={styles.appStoreButtons}>
                <a href="" className={styles.playStoreButton} />
                <a href="" className={styles.appStoreButton} />
              </div>
            </div>
          </aside>
        </div>

        <a className={styles.siteLink} href="https://cabbleapp.com">
          cabbleapp.com
        </a>
      </section>
    </Layout>
  );
}
