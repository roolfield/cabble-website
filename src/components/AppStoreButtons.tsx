import styles from './AppStoreButtons.module.css';
import classNames from 'classnames';

const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL as string;
const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL as string;

export function AppStoreButtons({
  className,
  buttonClass,
}: {
  className?: string;
  buttonClass?: string;
}) {
  return (
    <div className={classNames(styles.appStoreButtons, className)}>
      <a
        href={APP_STORE_URL}
        className={classNames(styles.playStoreButton, buttonClass)}
      />
      <a
        href={PLAY_STORE_URL}
        className={classNames(styles.appStoreButton, buttonClass)}
      />
    </div>
  );
}
