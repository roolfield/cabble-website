import { i18n, Messages } from '@lingui/core';
import linguiConfig from '../../lingui.config';
import { useEffect } from 'react';

export const APP_LANGUAGES = linguiConfig.locales.filter(
  lang => lang !== 'pseudo',
);

export async function loadCatalog(locale: string) {
  const catalog = await import(
    `@lingui/loader!./locales/${locale}/messages.po`
  );
  return catalog.messages;
}

export const resolveLanguage = (locale: string) => {
  const languageCode = locale.split(/[-_]/)[0];
  if (APP_LANGUAGES.includes(languageCode)) {
    return languageCode;
  }
  return linguiConfig.sourceLocale as string;
};

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
