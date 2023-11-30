import { i18n, Messages } from '@lingui/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * Load messages for requested locale and activate it.
 * This function isn't part of the LinguiJS library because there are
 * many ways how to load messages — from REST API, from file, from cache, etc.
 */
export async function loadCatalog(locale: string) {
  const catalog = await import(`@lingui/loader!./locales/${locale}.po`);
  return catalog.messages;
}

export function useLinguiInit(messages: Messages, locale: string) {
  useEffect(() => {
    if (messages || !i18n.locale || locale !== i18n.locale) {
      i18n.loadAndActivate({ locale, messages });
    }
  }, [messages]);

  return i18n;
}
