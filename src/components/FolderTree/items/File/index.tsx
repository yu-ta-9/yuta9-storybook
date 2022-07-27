import type { FC } from 'react';

import styles from './index.module.scss';

import { IconFile } from '../../../icons/File';

export type PersonItemProps = {
  id: number;
  name: string;
  nestNum: number;
};

export const FileItem: FC<PersonItemProps> = ({ id, name, nestNum }) => {
  return (
    <div id={String(id)} className={styles['file-item']} style={{ paddingLeft: `${8 + 32 * nestNum}px` }}>
      <IconFile width={20} height={20} />

      <div className={styles['heading']}>{name}</div>
    </div>
  );
};
