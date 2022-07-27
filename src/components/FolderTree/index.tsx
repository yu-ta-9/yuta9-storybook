import type { File, Folder } from './common/type';
import type { FC } from 'react';

import commonStyles from './common/index.module.scss';
import styles from './index.module.scss';
import { FolderTreeItem } from './items';

type Props = {
  data: (File | Folder)[];
};

export const FolderTree: FC<Props> = ({ data }) => {
  return (
    <div className={styles['folder-tree']}>
      <ul className={styles['tree']}>
        {data.map((data) => (
          <li className={commonStyles['list-data-item']} key={data.id + data.type}>
            <FolderTreeItem type={data.type} nestNum={0} data={data} />
          </li>
        ))}
      </ul>
    </div>
  );
};
