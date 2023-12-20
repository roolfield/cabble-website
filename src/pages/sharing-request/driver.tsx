import styles from './sharing-request.module.css';
import '@splidejs/react-splide/css/core';

import { request } from 'graphql-request';
import { t, Trans } from '@lingui/macro';

import { Layout } from '../../components/Layout';
import { useLingui } from '@lingui/react';
import GoogleServedImage from '../../components/GoogleServedImage';
import classnames from 'classnames';
import { Slider } from '../../components/Slider';
import { StickyHeader } from '../../components/StickyHeader';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { graphql } from '../../generated';
import { UseTypedDocumentNodeType } from '../../common/graphqlTypes';
import { useLink } from '../../common/useLink';

const query = graphql(`
  query DriverSharingRequest($driverId: ID!) {
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

  const [data, setData] = useState<UseTypedDocumentNodeType<typeof query>>();

  const [queryError, setQueryError] = useState<unknown>();

  const { makeLinkParams } = useLink();

  const breakpoint = 44 * 14; // 44em

  useEffect(() => {
    if (!router.query.driverId) {
      return;
    }
    const variables = {
      driverId: router.query.driverId.toString(),
    };
    request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? '', query, variables)
      .then(data => setData(data))
      .catch(setQueryError);
  }, [router.query.driverId]);

  const pairingCode = Array.isArray(router.query.pairingCode)
    ? router.query.pairingCode[0]
    : router.query.pairingCode;

  const openRedirect = useCallback(() => {
    if (!pairingCode) {
      alert('Invalid URL');
      return;
    }
    router.push(
      makeLinkParams({
        pathname: `/sharing-request/redirect`,
        query: {
          pairingCode,
        },
      }),
    );
  }, []);

  if (queryError) {
    return t(i18n)`Could not load the page`;
  }

  if (!data?.userProfile) {
    return t(i18n)`Could not load the user`;
  }

  return (
    <Layout
      showHeaderAndFooter={false}
      className={styles.container}
      ogImage={`${data?.userProfile.profilePicture?.url}=s1200`}
      title={t(i18n)`Message from ${
        data?.userProfile.firstName ?? ''
      } on Cabble`}>
      <section className={styles.pageSection}>
        <StickyHeader minWidth={breakpoint}>
          <header
            className={classnames(styles.sectionHeader, styles.pageHeader)}>
            <div className={styles.headerAvatars}>
              <GoogleServedImage
                url={data?.userProfile.profilePicture?.url ?? ''}
                widths={[48, 96, 192]}
                sizes={`(max-width: ${breakpoint}) 3em, 4em`}
                width={data?.userProfile.profilePicture?.metadata?.width}
                height={data?.userProfile.profilePicture?.metadata?.height}
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
              <GoogleServedImage
                url={data?.userProfile?.profilePicture?.url ?? ''}
                widths={[600, 1000, 2000]}
                sizes={`(max-width: ${breakpoint}) 100vw, 31.5em`}
                width={data?.userProfile?.profilePicture?.metadata?.width}
                height={data?.userProfile?.profilePicture?.metadata?.height}
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
                      With Cabble we can share your car safely and easily.
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
                        I pay for each trip based on the time and distance I
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
                      You can set a free number of kilometers per trip and a
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
              <Trans>Want to give it a go? 💪🏼</Trans>
            </h2>
          </header>
        </StickyHeader>

        <div className={styles.subSections}>
          <aside className={styles.subSection}>
            <div className={styles.sectionContent}>
              <header className={styles.subSectionHeader}>
                <h3>
                  <Trans>Add me on Cabble</Trans>
                </h3>
              </header>

              <p>
                This is a prive link that you can use to add me as a driver to
                your car on Cabble.
              </p>

              <button className={styles.pairButton} onClick={openRedirect}>
                <Trans>Add {data?.userProfile?.firstName}</Trans>
              </button>
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
