'use client';
import ActivitySection from '@/app/_components/activity-logs/activity-section';
import ToolBar from '@/app/_components/navbars/toolbar';
import ExcelSVG from '@/app/_components/svgs/files/excel';
import ImageSVG from '@/app/_components/svgs/files/image';
import PdfSVG from '@/app/_components/svgs/files/pdf';
import WordSVG from '@/app/_components/svgs/files/word';
import { contentFont } from '@/app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';

const Page = () => {
  const file = {
    type: 'pdf',
    name: 'myFile',
    size: '5mb',
  };

  const t = useTranslations();

  const path = [
    { id: 5, type: 'file', name: 'MyFile' },
    { id: 4, type: 'folder', name: 'Folder2' },
    { id: 3, type: 'folder', name: 'Folder1' },
    { id: 1, type: 'section', name: 'MySection' },
  ];

  return (
    <div>
      <ToolBar views={false} setView={''} view={''} path={path} />
      <ActivitySection />
      <div className={clsx('xl:mr-[432px]', contentFont.className)}>
        {/* FILE P1 */}
        <div className="flex flex-col gap-[24px]">
          {/* FILE */}
          <div className="flex gap-[10px] items-center justify-center">
            {/* Type */}
            <div>
              {file.type === 'pdf' && <PdfSVG />}
              {file.type === 'word' && <WordSVG />}
              {file.type === 'excel' && <ExcelSVG />}
              {file.type === 'image' && <ImageSVG />}
            </div>

            {/* Name + size */}
            <div className="flex flex-col gap-[10px]">
              <p className="text-black text-[18px] font-medium">{file.name}</p>
              <p className="text-textGray text-[14px] font-medium">
                {file.size}
              </p>
            </div>
          </div>

          {/* actions */}
          {/* <div className="flex gap-[16px] items-center">
            <button>{t('files.viewMetadata')}</button>
            <button>{t('files.uploadNewVersion')}</button>
          </div> */}
        </div>

        {/* FILE P2 */}
        <div></div>

        {/* FILE P3 */}
        <div></div>
      </div>
    </div>
  );
};

export default Page;

