import styles from './support.module.css';
import { Layout } from '../components/Layout';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import React, { useEffect } from 'react';
import { Button } from '../components/Button';
import { useRouter } from 'next/router';
import { useLink } from '../common/useLink';
import Link from 'next/link';

const WHATSAPP_URL = 'https://wa.me/31630686391';
const FEEDBACK_FORM_URL = 'https://forms.gle/qeBbJT95MdYQnd1w9';

export default function Support() {
  const { i18n } = useLingui();

  const { query, push } = useRouter();

  useEffect(() => {
    if (query['open-whatsapp'] !== undefined) {
      window.location.href = WHATSAPP_URL;
    }
  }, [query]);

  useEffect(() => {
    if (query['open-feedback-form'] !== undefined) {
      window.location.href = FEEDBACK_FORM_URL;
    }
  }, [query]);

  const { makeLinkParams } = useLink();

  return (
    <Layout title={t(i18n)`Support`} className={styles.container}>
      <h1>
        <Trans>We're happy to help you</Trans>
      </h1>
      <aside className={styles.sections}>
        <section>
          <h2>
            <Trans>Frequently Asked Questions</Trans>
          </h2>
          <p>
            <Trans>
              Find answers to the most common questions about our service.
            </Trans>
          </p>
          <Link href={makeLinkParams('/faq')}>
            <Button showArrow={true} element={null}>
              <Trans>Go to FAQ</Trans>
            </Button>
          </Link>
        </section>
        <section>
          <h2>
            <Trans>WhatsApp us</Trans>
          </h2>
          <p>
            <Trans>
              Send us a message and we will respond as soon as possible.
            </Trans>
          </p>
          <Button href={WHATSAPP_URL} showArrow={true} element={'a'}>
            <Trans>Open WhatsApp</Trans>
          </Button>
        </section>
        <section>
          <h2>
            <Trans>Email us</Trans>
          </h2>
          <p>
            <Trans>
              Send us an email a support@cabbleapp.com and we will respond as
              soon as possible.
            </Trans>
          </p>
          <Button
            showArrow={true}
            element={'a'}
            href={'mailto:support@cabbleapp.com'}>
            <Trans>Email us</Trans>
          </Button>
        </section>
        <section>
          <h2>
            <Trans>Feedback form</Trans>
          </h2>
          <p>
            <Trans>
              Use this form to send us feedback or report a problem.
            </Trans>
          </p>
          <Button
            target={'_blank'}
            element={'a'}
            showArrow={true}
            href={FEEDBACK_FORM_URL}>
            <Trans>Open feedback form</Trans>
          </Button>
        </section>
      </aside>
    </Layout>
  );
}
