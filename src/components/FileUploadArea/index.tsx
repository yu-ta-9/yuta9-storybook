import classNames from 'classnames';
import { useRef, useState, useEffect, useCallback } from 'react';

import type { FC, ChangeEvent } from 'react';

import styles from './index.module.scss';

type Props = {
  onSelectedFiles: (files: FileList) => void;
};

export const FileUploadArea: FC<Props> = ({ onSelectedFiles }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const uploadAreaDivRef = useRef<HTMLDivElement | null>(null);

  const upload = useCallback(
    (files: FileList): void => {
      onSelectedFiles(files);
    },
    [onSelectedFiles],
  );

  useEffect(() => {
    const instance = uploadAreaDivRef.current;

    const handleDragOver = (e: DragEvent): void => {
      e.stopPropagation();
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e: DragEvent): void => {
      e.stopPropagation();
      e.preventDefault();
      setIsDragOver(false);
    };

    const handleDrop = (e: DragEvent): void => {
      e.stopPropagation();
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer ? e.dataTransfer.files : undefined;

      if (!files) {
        return;
      }

      upload(files);
    };

    if (instance) {
      instance.addEventListener('dragover', handleDragOver, false);
      instance.addEventListener('dragleave', handleDragLeave, false);
      instance.addEventListener('drop', handleDrop, false);
    }

    return () => {
      if (instance) {
        instance.removeEventListener('dragover', handleDragOver);
        instance.removeEventListener('dragleave', handleDragLeave);
        instance.removeEventListener('drop', handleDrop);
      }
    };
  }, [upload]);

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!inputRef.current) {
      return;
    }

    e.preventDefault();

    inputRef.current.click();
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;

    if (!files) {
      return;
    }

    upload(files);
  };

  return (
    <div
      className={classNames(styles['file-upload-area'], { [styles['-dragover']]: isDragOver })}
      ref={uploadAreaDivRef}
    >
      <img className={styles['image']} src={`${process.env.PUBLIC_URL}/upload.png`} alt='Upload File'></img>
      <div className={styles['caption']}>Please upload file</div>
      <div className={styles['form']}>
        <button className={styles['button']} type='button' onClick={handleClickButton}>
          Select file
        </button>
        <input className={styles['input']} ref={inputRef} type='file' multiple onChange={handleChangeFile} />
      </div>
    </div>
  );
};
