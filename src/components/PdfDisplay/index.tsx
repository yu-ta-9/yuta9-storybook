// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import pdfjsWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.js';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import styles from './index.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc;

type Props = {
  url: string;
};

export const PdfDisplay: React.FC<Props> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>();

  return (
    <div className={styles['pdf-display']}>
      <Document
        className={styles['document']}
        file={url}
        loading={<div>Loading...</div>}
        onLoadSuccess={({ numPages }): void => {
          setNumPages(numPages);
        }}
        onLoadError={(error): void => {
          console.error(error);
        }}
      >
        {[...Array(numPages)].map((_, i) => (
          <Page className={styles['page']} key={i} pageNumber={i + 1} loading={<div>Loading...</div>} />
        ))}
      </Document>
    </div>
  );
};
