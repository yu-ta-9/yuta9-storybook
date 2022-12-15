import { forwardRef } from 'react';

import styles from './index.module.scss';

type Props = {
  name: string;
  svgComponent: JSX.Element;
} & JSX.IntrinsicElements['button'];

export const IconButton = forwardRef<HTMLButtonElement, Props>(({ name, svgComponent, ...buttonProps }, ref) => {
  return (
    <button className={styles['icon-button']} ref={ref} name={name} aria-label={name} {...buttonProps}>
      {svgComponent}
    </button>
  );
});

IconButton.displayName = 'IconButton';
