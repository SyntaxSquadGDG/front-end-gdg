'use client';
import React from 'react';
import FileItem from './file-item';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';

const Files = ({ files }) => {
  const t = useTranslations();

  return (
    <div>
      <p className={clsx(contentFont, 'mb-[24px] text-[22px] font-medium')}>
        {t('files.files')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-[32px] xl:mr-[432px]">
        {files.map((file) => {
          return <FileItem key={file.id} file={file} />;
        })}
      </div>
    </div>
  );
};

export default Files;

