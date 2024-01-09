import styles from './sharing-request.module.css';
import '@splidejs/react-splide/css/core';

import { request } from 'graphql-request';
import { msg, t, Trans } from '@lingui/macro';
import { MessageDescriptor } from '@lingui/core';

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
import classNames from 'classnames';
import LocalImage from '../../components/LocalImage';

export enum Transmission {
  Automatic = 'automatic',
  Manual = 'manual',
}

export enum FuelType {
  Gasoline = 'gasoline',
  Diesel = 'diesel',
  Electric = 'electric',
  Hybrid = 'hybrid',
  LPG = 'lpg',
  CNG = 'cng',
  Hydrogen = 'hydrogen',
  Other = 'other',
}

const fuelTypeTranslations: {
  [key in FuelType]: MessageDescriptor;
} = {
  [FuelType.Gasoline]: msg`Gasoline`,
  [FuelType.Diesel]: msg`Diesel`,
  [FuelType.Electric]: msg`Electric`,
  [FuelType.Hybrid]: msg`Hybrid`,
  [FuelType.LPG]: msg`LPG`,
  [FuelType.CNG]: msg`CNG`,
  [FuelType.Hydrogen]: msg`Hydrogen`,
  [FuelType.Other]: msg`Other`,
};

const query = graphql(`
  query OwnerSharingRequest($carId: ID!) {
    car(carId: $carId) {
      id
      name
      description
      profilePicture {
        url
        metadata {
          ... on ImageFileMetadataView {
            width
            height
          }
        }
      }
      vehicleData {
        fuel {
          type
        }
        licensePlate
        numberOfDoors
        numberOfSeats
        firstAdmission
      }
      location {
        description
      }
      transmission
      tripPricing {
        minimumBillableHours
        currency
        distanceAllowance
        serviceFeePercentage
        priceList {
          distancePrice
          timePrice
        }
      }
      owner {
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
  }
`);

export default function OwnerShareRequest() {
  const { i18n } = useLingui();

  const router = useRouter();

  const [data, setData] = useState<UseTypedDocumentNodeType<typeof query>>();

  const [queryError, setQueryError] = useState<unknown>();

  const { makeLinkParams } = useLink();

  const breakpoint = 44 * 14; // 44em

  useEffect(() => {
    if (!router.query.carId) {
      return;
    }
    const variables = {
      carId: router.query.carId as string,
    };
    request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? '', query, variables)
      .then(profileData => {
        setData(profileData);
      })
      .catch(setQueryError);
  }, [router.query.carId]);

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
    return t(i18n)`There was an error loading this page.`;
  }

  if (!data?.car) {
    return t(i18n)`Could not load this car`;
  }

  return (
    <Layout
      showHeaderAndFooter={false}
      className={styles.container}
      ogImage={`${data?.car.profilePicture?.url}=s1200`}
      title={t(i18n)`Message from ${data?.car.owner.firstName ?? ''}`}>
      <section className={styles.pageSection}>
        <StickyHeader minWidth={breakpoint}>
          <header
            className={classnames(styles.sectionHeader, styles.pageHeader)}>
            <div className={styles.headerAvatars}>
              {!data?.car.owner?.profilePicture?.url && (
                <span className={styles.avatarPlaceholder}>{'🙋'}</span>
              )}
              {data?.car.owner?.profilePicture?.url && (
                <GoogleServedImage
                  url={data?.car.owner?.profilePicture?.url ?? undefined}
                  widths={[48, 96, 192]}
                  sizes={`(max-width: ${breakpoint}) 3em, 4em`}
                  width={data?.car.profilePicture?.metadata?.width}
                  height={data?.car.profilePicture?.metadata?.height}
                  className={styles.ownerPicture}
                />
              )}
              <span className={styles.cabbleLogo}>C</span>
            </div>
            <span>
              This is a message from {data?.car.owner.firstName ?? ''}{' '}
              {data?.car.owner.lastName ?? ''}
            </span>
            <h1 className={styles.pageTitle}>
              <Trans>Hey, do you want to use my car together?</Trans>
            </h1>
          </header>
        </StickyHeader>

        <div className={styles.subSections}>
          <Slider
            className={styles.slider}
            prevText={t(i18n)`About my car`}
            nextText={t(i18n)`About me`}>
            <aside className={classnames(styles.subSection, styles.lgTitleTop)}>
              <figure>
                {data?.car.profilePicture?.url && (
                  <GoogleServedImage
                    url={data?.car.profilePicture?.url ?? ''}
                    widths={[600, 1000, 2000]}
                    sizes={`(max-width: ${breakpoint}) 100vw, 31.5em`}
                    width={data?.car.profilePicture?.metadata?.width}
                    height={data?.car.profilePicture?.metadata?.height}
                    className={styles.subSectionImage}
                  />
                )}
                {!data?.car.profilePicture?.url && (
                  <LocalImage
                    src={'../../images/car-placeholder.png'}
                    className={styles.subSectionImage}
                    width={310}
                    height={219}
                    sizes={`(max-width: ${breakpoint}) 100vw, 31.5em`}
                  />
                )}
              </figure>

              <header className={styles.subSectionHeader}>
                <span>
                  <Trans>About my car</Trans>
                </span>
                <h3>{data?.car.name ?? t(i18n)`Loading`}</h3>
              </header>

              <div className={styles.subSectionContent}>
                <ul className={styles.carDetails}>
                  <li>
                    <span className={styles.label}>
                      <Trans>General</Trans>
                    </span>
                    <span className={styles.value}>
                      {(data.car.vehicleData
                        ? [
                            new Date(
                              data?.car.vehicleData.firstAdmission ?? '0',
                            ).getFullYear(),
                            i18n._(
                              fuelTypeTranslations[
                                data?.car.vehicleData.fuel?.type as FuelType
                              ],
                            ),
                            data?.car.transmission === Transmission.Automatic
                              ? t(i18n)`Automatic`
                              : t(i18n)`Manual`,
                            t(
                              i18n,
                            )`${data?.car.vehicleData.numberOfDoors} doors`,
                            t(
                              i18n,
                            )`${data?.car.vehicleData.numberOfSeats} seats`,
                          ]
                        : []
                      ).join(' • ')}
                    </span>
                  </li>
                  <li>
                    <span className={styles.label}>
                      <Trans>Location</Trans>
                    </span>
                    <span className={styles.value}>
                      {data?.car.location?.description.replaceAll(', ', ' • ')}
                    </span>
                  </li>
                  <li>
                    <span className={styles.label}>
                      <Trans>License plate number</Trans>
                    </span>
                    <span className={styles.value}>
                      {data?.car.vehicleData?.licensePlate}
                    </span>
                  </li>
                </ul>
              </div>
            </aside>

            <aside className={classnames(styles.subSection, styles.lgTitleTop)}>
              <figure>
                {data?.car.owner.profilePicture?.url && (
                  <GoogleServedImage
                    url={data?.car.owner.profilePicture?.url ?? ''}
                    widths={[600, 1000, 2000]}
                    sizes={`(max-width: ${breakpoint}) 100vw, 31.5em`}
                    width={data?.car.owner.profilePicture?.metadata?.width}
                    height={data?.car.owner.profilePicture?.metadata?.height}
                    className={styles.subSectionImage}
                  />
                )}
              </figure>

              <header className={styles.subSectionHeader}>
                <span>
                  <Trans>About me</Trans>
                </span>
                <h3>{`${data?.car.owner.firstName} ${data?.car.owner.lastName}`}</h3>
              </header>

              <div className={styles.subSectionContent}>
                <strong>
                  <Trans>About my Cabble profile</Trans>
                </strong>
                <br />
                <p>{data?.car.description}</p>
              </div>
            </aside>
          </Slider>

          <button className={styles.pairButton} onClick={openRedirect}>
            <Trans>Add {data?.car?.name} on Cabble</Trans>
          </button>
        </div>
      </section>

      <section className={styles.pageSection}>
        <StickyHeader minWidth={breakpoint}>
          <header className={styles.sectionHeader}>
            <h2>
              <Trans>And how does that all work? 🤔</Trans>
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
                      With Cabble we can share my car safely and easily.
                    </Trans>
                  </h3>
                </header>

                <div className={styles.subSectionContent}>
                  <ul className={styles.bulletList}>
                    <li>
                      <Trans>
                        You make a reservation for when you need it. After my
                        approval you can start your trip in the app.
                      </Trans>
                    </li>
                    <li>
                      <Trans>
                        Pay for each trip based on the time and distance you
                        drive. If you could not refuel, the app takes care of
                        that too.
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
                    You save the cost of ownership, I get some of the costs
                    back.
                  </Trans>
                </h3>
              </header>

              <div className={styles.subSectionContent}>
                <ul className={styles.bulletList}>
                  <li>
                    <Trans>
                      You pay{' '}
                      {data?.car.tripPricing?.priceList.timePrice.toLocaleString(
                        i18n.locale,
                        {
                          style: 'currency',
                          currency: data?.car.tripPricing?.currency,
                        },
                      )}{' '}
                      per hour.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      You can drive {data?.car.tripPricing?.distanceAllowance}{' '}
                      for free and pay{' '}
                      {data?.car.tripPricing?.priceList.distancePrice.toLocaleString(
                        i18n.locale,
                        {
                          style: 'currency',
                          currency: data?.car.tripPricing?.currency,
                        },
                      )}{' '}
                      per kilometer after that (excluding fuel).
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      To make it worth my while, you pay a minimum of{' '}
                      {data?.car.tripPricing?.minimumBillableHours} hours per
                      trip.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      You either refuel the car yourself or this gets added to
                      the trip price.
                    </Trans>
                  </li>
                </ul>

                <a href="https://cabbleapp.com" className={styles.learnMore}>
                  Learn more
                </a>
              </div>
            </aside>
          </Slider>
        </div>
      </section>

      <section className={classNames(styles.pageSection, styles.pairSection)}>
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
                  <Trans>Add this car on the Cabble app</Trans>
                </h3>
              </header>

              <p>
                This is a prive link that you can use to become a driver of this
                car on the Cabble app.
              </p>

              <button className={styles.pairButton} onClick={openRedirect}>
                <Trans>Add {data?.car?.name} on Cabble</Trans>
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
