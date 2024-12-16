'use client';
import ExcelSVG from '@app/_components/svgs/files/excel';
import ImageSVG from '@app/_components/svgs/files/image';
import PdfSVG from '@app/_components/svgs/files/pdf';
import WordSVG from '@app/_components/svgs/files/word';
import React from 'react';

const FileIcon = ({ type }) => {
  if (type === 'pdf') {
    return <PdfSVG />;
  }

  if (type === 'word') {
    return <WordSVG />;
  }

  if (type === 'excel') {
    return <ExcelSVG />;
  }

  if (type === 'image') {
    return <ImageSVG />;
  }
};

export default FileIcon;

