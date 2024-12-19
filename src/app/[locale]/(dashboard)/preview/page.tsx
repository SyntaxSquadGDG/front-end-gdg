'use client';
import Docviewer from '@app/_components/previewers/doc-viewer';
import DocxPreviewer from '@app/_components/previewers/docx-viewer';
import MarkdownRenderer from '@app/_components/previewers/markdown-preview';
import PDFPreviewer from '@app/_components/previewers/pdf-previewer';
import PdfViewer from '@app/_components/previewers/pdf-viewer';
import XlsxPreviewer from '@app/_components/previewers/xlsx-viewer';
import React from 'react';

const page = () => {
  return (
    <div>
      <PdfViewer />
      <MarkdownRenderer />
      <DocxPreviewer />
      {/* <Docviewer /> */}
      {/* <XlsxPreviewer /> */}
    </div>
  );
};

export default page;

