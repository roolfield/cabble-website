import styles from './Button.module.css';
import classNames from 'classnames';

type ButtonVariant = 'outline-white' | 'outline-blue';

interface SharedProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: 'sm' | 'lg';
  className?: string;
  showArrow?: boolean;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  element?: 'button';
  onClick: () => void;
}

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  element?: 'a';
}

export interface OnlyVisualProps {
  element?: null;
}

export type Props = SharedProps & (ButtonProps | AnchorProps | OnlyVisualProps);

export const Button = (props: Props) => {
  const {
    size = 'small',
    variant = 'outline-blue',
    element = 'a',
    children,
    className,
    showArrow,
    ...rest
  } = props;
  const Component = element ?? 'div';
  return (
    <Component
      className={classNames(
        className,
        styles.button,
        variant === 'outline-white' ? styles.buttonOutlineWhite : undefined,
        variant === 'outline-blue' ? styles.buttonOutlineBlue : undefined,
        size === 'small' ? styles.buttonSmall : undefined,
        size === 'lg' ? styles.buttonLarge : undefined,
      )}
      {...(rest as any)}>
      {children}
      {showArrow && <span aria-hidden="true"> →</span>}
    </Component>
  );
};
