import { useCallback, useMemo } from 'react';
import { useLingui } from '@lingui/react';

export const useNumberFormat = () => {
  const { i18n } = useLingui();

  const formatInCurrency = useCallback(
    (number: number, { currency }: { currency: string }): string => {
      return number.toLocaleString(i18n.locale, {
        style: 'currency',
        currency: currency.toUpperCase(),
      });
    },
    [i18n.locale],
  );

  return useMemo(
    () => ({
      formatInCurrency,
    }),
    [formatInCurrency],
  );
};
