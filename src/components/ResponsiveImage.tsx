import { useState } from 'react';
import Observer from '@researchgate/react-intersection-observer';
import classnames from 'classnames';

export default function ResponsiveImage({
  url,
  widths,
  sizes,
  alt,
  style,
  imgStyle,
  lazy = true,
  showOverlay = false,
  styles = null,
  className = undefined,
  scale = false,
  progressive = true,
  width,
  height,
  imageParams = [],
}: {
  url?: string;
  widths: number[];
  sizes: string;
  alt?: string;
  style?: object;
  imgStyle?: object;
  lazy?: boolean;
  showOverlay?: boolean;
  styles?: any;
  className?: string;
  scale?: boolean;
  progressive?: boolean;
  width?: number;
  height?: number;
  imageParams?: string[];
}) {
  if (!url) {
    return null;
  }

  const getSrcSet = (
    url?: string,
    widths: number[] = [],
    additionalParams: string[] = [],
  ) => {
    if (!url) return;
    const sources = widths.map(size => {
      let params = [`s${size}`];
      params = params.concat(additionalParams).concat(imageParams);
      return `${url}=${params.join('-')}`;
    });
    const srcSet = sources
      .map((url, index) => `${url} ${widths[index]}w`)
      .join(', ');
    return srcSet;
  };

  const [isInViewport, setIsInViewport] = useState(!lazy);
  const [loaded, setLoaded] = useState(false);

  const jpegSrcSet = getSrcSet(url, widths, ['rj']);
  const webPSrcSet = getSrcSet(url, widths, ['rw']);

  const onIntersect = ({ isIntersecting }: { isIntersecting: boolean }) => {
    if (isIntersecting) {
      setIsInViewport(true);
    }
  };

  const onLoad = () => {
    setLoaded(true);
  };

  const containerClasses = [className || ''];
  if (isInViewport) {
    containerClasses.push('visible');
  }
  if (!lazy || loaded) {
    containerClasses.push('loaded');
  }
  if (scale) {
    containerClasses.push('scale');
  }

  const progressiveImgUrl = `${url}=s10-c-fSoften=1,100,0`;
  const aspectRatio = (height ?? 0) / (width ?? 1);

  const show = !progressive || isInViewport || !!url;

  return (
    <Observer disabled={!lazy} onChange={onIntersect}>
      <picture
        className={`container ${containerClasses.join(' ')}`.trim()}
        style={{
          backgroundImage: show ? `url(${progressiveImgUrl})` : '',
          ...style,
        }}>
        <div
          className="placeholder"
          style={{
            paddingTop: Math.round(aspectRatio * 100000) / 1000 + '%',
            maxHeight: height,
          }}
        />
        <source
          type="image/webp"
          sizes={sizes}
          srcSet={show ? webPSrcSet : undefined}
        />
        <source
          type="image/jpeg"
          sizes={sizes}
          srcSet={show ? jpegSrcSet : undefined}
        />
        <img
          style={imgStyle}
          className={className}
          alt={alt}
          onLoad={onLoad}
          width={width}
          height={height}
          src={show ? `${url}=s600-rj` : undefined}
        />
        {showOverlay && <div className={classnames(['overlay', className])} />}
        {/*language=CSS*/}
        <style jsx>{`
          picture {
            background: no-repeat center center grey;
            background-size: cover;
            display: block;
            position: relative;
          }
          img {
            position: absolute;
            top: 0;
            z-index: 0;
            opacity: 0;
            transition:
              opacity 0.3s,
              transform 0.3s;
            vertical-align: middle;
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
          .loaded img {
            opacity: 1;
          }
          .container.scale:hover img {
            transform: scale(1.05);
          }
        `}</style>
        {styles}
      </picture>
    </Observer>
  );
}
