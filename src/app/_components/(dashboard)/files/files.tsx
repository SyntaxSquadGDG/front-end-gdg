'use client';
import React from 'react';
import FileItem from './file-item';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';

const Files = ({ files }) => {
  const t = useTranslations();
  console.log(files);

  return (
    <>
      {files.map((file) => {
        return <FileItem key={file.id} file={file} />;
      })}
    </>
  );
};

export default Files;

