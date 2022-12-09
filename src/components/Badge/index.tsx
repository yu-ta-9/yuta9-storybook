import type { FC } from 'react';

import { COLOR_SCHEMA } from './const';
import styles from './index.module.scss';

type Props = {
  label: string;
  colorType: keyof typeof COLOR_SCHEMA;
};

export const Badge: FC<Props> = ({ label, colorType }) => {
  const color = COLOR_SCHEMA[colorType];

  return (
    <div
      className={styles['badge-wrapper']}
      style={{
        backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`,
        border: `1px double rgb(${color.r}, ${color.g}, ${color.b})`,
      }}
    >
      {label}
    </div>
  );
};
