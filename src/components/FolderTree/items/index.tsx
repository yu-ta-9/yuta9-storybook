import type { File, Folder } from '../common/type';
import type { FC } from 'react';

import { FileItem } from './File';
import { FolderItem } from './Folder';

type Props = {
  type: 'folder' | 'file';
  nestNum: number;
  data: Folder | File;
};

export const FolderTreeItem: FC<Props> = ({ type, nestNum, data }) => {
  switch (type) {
    case 'folder':
      return (
        <FolderItem
          id={(data as Folder).id}
          name={(data as Folder).name}
          data={(data as Folder).data}
          nestNum={nestNum}
        />
      );

    case 'file':
      return <FileItem id={(data as File).id} name={(data as File).name} nestNum={nestNum} />;
  }
};
