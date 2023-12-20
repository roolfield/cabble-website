import { ReactNode, useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';

export const StickyHeader = ({
  children,
  minWidth,
}: {
  children: ReactNode;
  minWidth: number;
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [width, setWidth] = useState<number | string>(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = throttle(() => {
      if (!wrapperRef.current || !contentRef.current) {
        return;
      }
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const parentElem = wrapperRef.current.parentElement;
      if (!parentElem) {
        return;
      }
      const distanceToBottomParent =
        parentElem.getBoundingClientRect().bottom - contentRect.height;
      setIsSticky(
        window.innerWidth >= minWidth &&
          wrapperRect.top < 0 &&
          distanceToBottomParent > 0,
      );
    }, 100);

    const onResize = throttle(() => {
      if (!contentRef.current || !wrapperRef.current) {
        return;
      }
      setWidth(
        window.getComputedStyle(contentRef.current).position === 'fixed'
          ? wrapperRef.current.getBoundingClientRect().width
          : 'auto',
      );
    }, 100);

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    onResize();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  });

  return (
    <div ref={wrapperRef}>
      <div
        style={{ width, position: isSticky ? 'fixed' : 'initial', top: 0 }}
        ref={contentRef}>
        {children}
      </div>
    </div>
  );
};
