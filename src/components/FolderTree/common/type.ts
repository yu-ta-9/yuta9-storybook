export type File = {
  type: 'file';
  id: number;
  name: string;
};

export type Folder = {
  type: 'folder';
  id: number;
  name: string;
  data: File[];
};
