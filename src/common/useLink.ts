import { useCallback, useMemo } from 'react';
import { Url } from 'next/dist/shared/lib/router/router';
import { useLingui } from '@lingui/react';

export const useLink = () => {
  const { i18n } = useLingui();

  // Append lang parameter
  const makeLink = useCallback(
    (url: Url): Url => ({
      ...(typeof url === 'string' ? {} : url),
      pathname: typeof url === 'string' ? url : url.pathname,
      query: {
        ...(typeof url === 'string'
          ? {}
          : typeof url.query === 'string'
            ? {}
            : url.query),
        lang: i18n.locale,
      },
    }),
    [],
  );

  return useMemo(
    () => ({
      makeLinkParams: makeLink,
    }),
    [],
  );
};
