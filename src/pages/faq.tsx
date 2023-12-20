import { Layout } from '../components/Layout';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import styles from './faq.module.css';

export default function FAQ() {
  const { i18n } = useLingui();

  const [faqContent, setFaqContent] = useState('');

  useEffect(() => {
    if (!i18n) {
      return;
    }
    import(`/public/content/${i18n.locale}/faq.md`).then(module => {
      remark()
        .use(html)
        .process(module.default)
        .then(processedContent => setFaqContent(processedContent.toString()));
    });
  }, []);

  return (
    <Layout
      title={t(i18n)`Frequently Asked Questions`}
      className={styles.container}>
      <h1>
        <Trans>Frequently asked questions</Trans>
      </h1>
      <aside>
        <div dangerouslySetInnerHTML={{ __html: faqContent }} />
      </aside>
    </Layout>
  );
}
