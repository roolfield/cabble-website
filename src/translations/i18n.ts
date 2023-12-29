import { i18n, Messages } from '@lingui/core';
import { useEffect } from 'react';

export async function loadCatalog(locale: string) {
  const catalog = await import(
    `@lingui/loader!./locales/${locale}/messages.po`
  );
  return catalog.messages;
}

export function useLinguiInit(
  messages: Messages | undefined,
  locale: string | undefined,
) {
  useEffect(() => {
    if (messages && locale && (!i18n.locale || locale !== i18n.locale)) {
      i18n.loadAndActivate({ locale, messages });
    }
  }, [messages]);

  return i18n;
}
