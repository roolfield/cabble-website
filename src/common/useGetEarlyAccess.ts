import Swal from 'sweetalert2';
import { useCallback, useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';

export const useGetEarlyAccess = () => {
  const { i18n } = useLingui();

  const showPopup = useCallback(() => {
    Swal.fire({
      title: t(i18n)`Get early access`,
      text: t(
        i18n,
      )`Please enter your email. This will open your email client to send us an email (support@cabbleapp.com) with your request.`,
      input: 'text',
      inputPlaceholder: t(i18n)`john@doe.com`,
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        window.location.href = `mailto:support@cabbleapp.com?subject=Early%20access&body=Please%20send%20me%20the%20download%20link%20for%20Cabble%20app%3A%20${encodeURIComponent(
          result.value,
        )}.`;

        Swal.fire({
          icon: 'success',
          title: t(i18n)`Thank you!`,
          text: t(i18n)`You will receive an email with the download link soon.`,
        });
      }
    });
  }, []);

  return useMemo(
    () => ({
      showPopup,
    }),
    [],
  );
};
