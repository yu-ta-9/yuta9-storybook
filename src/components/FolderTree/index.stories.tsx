import { FolderTree } from '.';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

export default {
  component: FolderTree,
} as ComponentMeta<typeof FolderTree>;

export const Template: ComponentStoryObj<typeof FolderTree> = {
  args: {
    data: [
      {
        type: 'folder',
        id: 1,
        name: 'Folder1',
        data: [
          { type: 'file', id: 11, name: 'File1-1' },
          { type: 'file', id: 12, name: 'File1-2' },
        ],
      },
      {
        type: 'folder',
        id: 2,
        name: 'Folder2',
        data: [{ type: 'file', id: 21, name: 'File2-1' }],
      },
      { type: 'file', id: 3, name: 'File3' },
      { type: 'file', id: 4, name: 'File4' },
      { type: 'file', id: 5, name: 'File5' },
      { type: 'file', id: 6, name: 'File6' },
      {
        type: 'folder',
        id: 7,
        name: 'Folder7',
        data: [
          { type: 'file', id: 71, name: 'File7-1' },
          { type: 'file', id: 72, name: 'File7-2' },
          { type: 'file', id: 73, name: 'File7-3' },
          { type: 'file', id: 74, name: 'File7-4' },
          { type: 'file', id: 75, name: 'File7-5' },
        ],
      },
      { type: 'file', id: 8, name: 'File8' },
      { type: 'file', id: 9, name: 'File9' },
    ],
  },
};
