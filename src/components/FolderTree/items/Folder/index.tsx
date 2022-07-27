import { useState } from 'react';

import type { File, Folder } from '../../common/type';
import type { FC } from 'react';

import styles from './index.module.scss';

import { FolderTreeItem } from '..';
import { IconChevronDown } from '../../../icons/ChevronDown';
import { IconChevronUp } from '../../../icons/ChevronUp';
import { IconFolder } from '../../../icons/Folder';
import commonStyles from '../../common/index.module.scss';

export type FolderItemProps = {
  id: number;
  name: string;
  data: (File | Folder)[];
  nestNum: number;
};

export const FolderItem: FC<FolderItemProps> = ({ id, name, data, nestNum }) => {
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  const toggleIsFolderOpen = (): void => {
    setIsFolderOpen((prev) => !prev);
  };

  return (
    <>
      <div id={String(id)} className={styles['folder-item']} style={{ paddingLeft: `${8 + 32 * nestNum}px` }}>
        <div className={styles['onclick']} role='button' onClick={toggleIsFolderOpen}>
          <IconFolder width={20} height={20} />

          <div className={styles['heading']}>{name}</div>
        </div>

        {isFolderOpen ? <IconChevronUp width={20} height={20} /> : <IconChevronDown width={20} height={20} />}
      </div>
      <ul className={styles['nested-folder-tree']} style={{ display: isFolderOpen ? 'block' : 'none' }}>
        {data.map((data) => (
          <li key={data.id + data.type} className={commonStyles['list-data-item']}>
            <FolderTreeItem type={data.type} nestNum={nestNum + 1} data={data} />
          </li>
        ))}
      </ul>
    </>
  );
};
