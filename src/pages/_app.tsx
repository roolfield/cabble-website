import { Inter, Work_Sans } from 'next/font/google';

import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

import '../styles/globals.css';
import { loadCatalog, useLinguiInit } from '../translations/i18n';
import { AppProps } from 'next/app';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });
const workSans = Work_Sans({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }: AppProps) {
  const [messages, setMessages] = useState({});

  const router = useRouter();

  const loadedQuery = useRef(false);

  useEffect(() => {
    if (!loadedQuery.current) {
      loadedQuery.current = true;
      return;
    }
    if (!router.query.lang) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('lang', 'en');
      window.location.search = searchParams.toString();
    }
  }, [router.query]);

  const locale = loadedQuery.current
    ? Array.isArray(router.query.lang)
      ? router.query.lang[0]
      : router.query.lang
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
