import { useMemo, useState } from 'react';
import classnames from 'classnames';
import { useInView } from 'react-intersection-observer';

export default function LocalImage({
  src,
  sizes,
  alt,
  style,
  imgStyle,
  lazy = true,
  showOverlay = false,
  styles = null,
  className = undefined,
  width,
  height,
}: {
  src?: string;
  sizes?: string;
  alt?: string;
  lazy?: boolean;
  style?: object;
  imgStyle?: object;
  showOverlay?: boolean;
  styles?: any;
  className?: string;
  width: number;
  height: number;
}) {
  if (!src) {
    return null;
  }

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const [name, ext] = useMemo(() => {
    const parts = src.split('.');
    return [parts.slice(0, -1).join('.'), parts[parts.length - 1]];
  }, []);

  const srcSet = useMemo(() => {
    if (!src) return;
    return [1, 2, 3]
      .map(size => {
        return `${name}${size === 1 ? '' : `@${size}x`}.${ext} ${
          width * size
        }w`;
      })
      .join(', ');
  }, []);

  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  };

  const containerClasses = [className || ''];
  if (inView) {
    containerClasses.push('visible');
  }
  if (!lazy || loaded) {
    containerClasses.push('loaded');
  }

  const aspectRatio = (height ?? 0) / (width ?? 1);

  const show = !lazy || inView;

  return (
    <picture
      ref={ref}
      className={`container ${containerClasses.join(' ')}`.trim()}
      style={style}>
      <div
        className="placeholder"
        style={{
          paddingTop: Math.round(aspectRatio * 100000) / 1000 + '%',
          maxHeight: height,
        }}
      />
      <source
        type={`image/${ext}`}
        sizes={sizes}
        srcSet={show ? srcSet : undefined}
      />
      <img
        style={imgStyle}
        className={className}
        alt={alt}
        onLoad={onLoad}
        width={width}
        height={height}
        src={show ? src : undefined}
      />
      {showOverlay && <div className={classnames(['overlay', className])} />}
      {/*language=CSS*/}
      <style jsx>{`
        picture {
          background: no-repeat center center;
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
  );
}
