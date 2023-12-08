import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

import '../styles/globals.css';
import { loadCatalog, useLinguiInit } from '../translations/i18n';
import { AppProps } from 'next/app';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [messages, setMessages] = useState({});

  const { isReady, query } = useRouter();

  const loadedQuery = useRef(false);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (!query.lang) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('lang', 'en');
      window.location.search = searchParams.toString();
    }
  }, [query, isReady]);

  const locale = loadedQuery.current
    ? Array.isArray(query.lang)
      ? query.lang[0]
      : query.lang
    : undefined;

  const loadMessages = useCallback(async locale => {
    if (!locale) {
      return;
    }

    const messages = await loadCatalog(locale);

    setMessages(messages);
  }, []);

  useEffect(() => {
    loadMessages(locale);
  }, [locale]);

  useLinguiInit(messages, locale);

  return (
    <>
      <I18nProvider i18n={i18n}>
        <Component {...pageProps} />
      </I18nProvider>
    </>
  );
}
