import React, { useState } from 'react';

import { FileUploadArea } from '.';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: FileUploadArea,
} as ComponentMeta<typeof FileUploadArea>;

export const Template: ComponentStory<typeof FileUploadArea> = (_args) => {
  const [files, setFiles] = useState<FileList>();

  const handleSelectedFiles = (files: FileList): void => {
    setFiles(files);
  };

  return (
    <>
      <FileUploadArea onSelectedFiles={handleSelectedFiles} />
      {!!files && (
        <div style={{ marginTop: '32px' }}>
          <p>Uploaded files</p>
          {Array.from(files).map((e, i) => (
            <React.Fragment key={i}>
              <p style={{ marginTop: '16px' }}>No.{i + 1}</p>
              <ul>
                <li>{e.name}</li>
                <li>{e.type}</li>
                <li>{e.size}</li>
              </ul>
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};
