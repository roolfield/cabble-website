import styles from './CommunityComposition.module.css';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import LocalImage from './LocalImage';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import throttle from 'lodash.throttle';
import { useInView } from 'react-intersection-observer';

export const CommunityComposition = () => {
  const { i18n } = useLingui();

  const [transitionValue, setTransitionValue] = useState(0);

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const avatars = useMemo(
    () => [
      {
        title: t(i18n)({
          id: `neighbour.f`,
          context: `female`,
          message: `Neighbour`,
        }),
        image: '/images/avatars/neighbour.png',
        width: 76,
        height: 75,
        top: '40%',
        scale: 0.8,
        transitionAt: 0.5,
      },
      {
        title: t(i18n)({
          id: `neighbour.f`,
          context: `female`,
          message: `Neighbour`,
        }),
        image: '/images/avatars/neighbour3.png',
        width: 146,
        height: 146,
        top: '-10%',
        scale: 1.1,
        transitionAt: 0.3,
      },
      {
        title: t(i18n)({
          id: `neighbour.m`,
          context: `male`,
          message: `Neighbour`,
        }),
        image: '/images/avatars/neighbour2.png',
        width: 106,
        height: 105,
        top: '20%',
        scale: 0.9,
        transitionAt: 0.2,
      },
      {
        title: t(i18n)`Friend`,
        image: '/images/avatars/friend.png',
        width: 135,
        height: 135,
        top: '45%',
        transitionAt: 0.6,
      },
      {
        title: t(i18n)`Daughter`,
        image: '/images/avatars/daughter.png',
        width: 114,
        height: 114,
        top: '30%',
        left: '20%',
        transitionAt: 0.8,
      },
      {
        title: t(i18n)`Owner`,
        image: '/images/avatars/owner.png',
        width: 134,
        height: 134,
        left: '10%',
        className: styles.owner,
        scale: 1.05,
        transitionAt: 0.1,
      },
      {
        image: '/images/avatars/car.png',
        width: 225,
        height: 224,
        scale: 1.6,
        top: '40%',
        left: '-30%',
        className: styles.car,
        transitionAt: 0.01,
      },
      {
        title: t(i18n)`Son`,
        image: '/images/avatars/son.png',
        width: 132,
        height: 132,
        top: '40%',
        left: '-15%',
        transitionAt: 0.9,
      },
    ],
    [],
  );

  useEffect(() => {
    const listener = throttle(() => {
      if (!entry) {
        return;
      }
      const boundingClientRect = entry.target.getBoundingClientRect();
      const heightOfViewPort = window.innerHeight;
      const bottomOfElement =
        boundingClientRect.top + boundingClientRect.height;
      const scrollPercentage =
        (heightOfViewPort - bottomOfElement) / (heightOfViewPort * 0.4);
      setTransitionValue(Math.min(Math.max(0, scrollPercentage), 1));
    }, 100);
    if (inView) {
      document.addEventListener('scroll', listener);
    }
    return () => document.removeEventListener('scroll', listener);
  }, [inView]);

  return (
    <div ref={ref} className={styles.container}>
      {avatars.map(item => {
        const transition = transitionValue >= item.transitionAt;
        return (
          <div
            style={{
              transform: `scale(${item.scale || 1}) translateY(${
                transition ? 0 : '-50%'
              })`,
              top: item.top,
              left: item.left,
            }}
            className={classNames(
              styles.item,
              item.className,
              transition && styles.transition,
            )}>
            <LocalImage
              width={item.width}
              height={item.height}
              src={item.image}
              alt={item.title}
            />
            {item.title && <span className={styles.label}>{item.title}</span>}
          </div>
        );
      })}
    </div>
  );
};
