import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

import '../styles/globals.css';
import { loadCatalog, useLinguiInit } from '../translations/i18n';
import { AppProps } from 'next/app';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

function getBrowserLanguage() {
  if (navigator.languages != undefined) return navigator.languages[0];
  return navigator.language;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [messages, setMessages] = useState();

  const { isReady, query } = useRouter();

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (!query.lang) {
      const searchParams = new URLSearchParams(window.location.search);
      const locale = getBrowserLanguage().indexOf('nl') !== -1 ? 'nl' : 'en';
      searchParams.set('lang', locale);
      window.location.search = searchParams.toString();
    }
  }, [query, isReady]);

  const locale = useMemo(
    () =>
      query.lang
        ? Array.isArray(query.lang)
          ? query.lang[0]
          : query.lang
        : undefined,
    [query.lang],
  );

  const loadMessages = useCallback(async (locale: string) => {
    if (!locale) {
      return;
    }

    const messages = await loadCatalog(locale);

    setMessages(messages);
  }, []);

  useEffect(() => {
    if (!locale) {
      return;
    }
    loadMessages(locale);
  }, [locale]);

  useLinguiInit(messages, locale);

  return (
    <I18nProvider i18n={i18n}>
      <Component {...pageProps} />
    </I18nProvider>
  );
}
