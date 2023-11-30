import styles from './Slider.module.css';
import classnames from 'classnames';
import { useRef } from 'react';
import { Options } from '@splidejs/splide';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';

export const Slider = ({
  prevText,
  nextText,
  className,
  children,
}: {
  prevText: string;
  nextText: string;
  className: string;
  children: Array<React.ReactNode>;
}) => {
  const splideOptions = useRef<Options>({
    padding: '1em',
    mediaQuery: 'min',
    breakpoints: {
      704: {
        destroy: true,
      },
    },
  });

  return (
    <Splide
      className={classnames(styles.slider, className)}
      hasTrack={false}
      options={splideOptions.current}>
      <SplideTrack>
        {children.map((child, index) => (
          <SplideSlide key={index} className={styles.slide}>
            {child}
          </SplideSlide>
        ))}
      </SplideTrack>

      <div className={classnames(styles.pagination, 'slider__pagination')}>
        <ul className="splide__pagination"></ul>
        <div className={classnames('splide__arrows', styles.splideArrows)}>
          <button className="splide__arrow splide__arrow--prev">
            {prevText}
          </button>
          <button className="splide__arrow splide__arrow--next">
            {nextText}
          </button>
        </div>
      </div>
    </Splide>
  );
};
