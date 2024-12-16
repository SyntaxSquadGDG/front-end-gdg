'use client';
import ActivitySection from '@app/_components/(dashboard)/activity-logs/activity-section';
import ToolBar from '@/app/_components/navbars/toolbar';
import ExcelSVG from '@/app/_components/svgs/files/excel';
import ImageSVG from '@/app/_components/svgs/files/image';
import PdfSVG from '@/app/_components/svgs/files/pdf';
import WordSVG from '@/app/_components/svgs/files/word';
import { contentFont } from '@/app/_utils/fonts';
import Button from '@app/_components/(dashboard)/general/button';
import HeadText from '@app/_components/(dashboard)/general/headtext';
import Input from '@app/_components/(dashboard)/general/input';
import RemoveSVG from '@app/_components/svgs/files/remove';
import RestoreSVG from '@app/_components/svgs/files/restore';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { getLangDir } from 'rtl-detect';

const Page = () => {
  const file = {
    type: 'pdf',
    name: 'myFile',
    size: '5mb',
  };

  const t = useTranslations();
  const locale = useLocale();
  const direction = getLangDir(locale);

  const path = [
    { id: 5, type: 'file', name: 'MyFile' },
    { id: 4, type: 'folder', name: 'Folder2' },
    { id: 3, type: 'folder', name: 'Folder1' },
    { id: 1, type: 'section', name: 'MySection' },
  ];

  const versions = [
    {
      uploaded: '28/10/2024',
      type: 'pdf',
      name: 'myFileOld',
    },
    {
      uploaded: '28/11/2024',
      type: 'pdf',
      name: 'myFileOld2',
    },
    {
      uploaded: '28/12/2024',
      type: 'pdf',
      name: 'myFileOld3',
    },
  ];

  return (
    <div>
      <ToolBar views={false} setView={''} view={''} path={path} />
      <div className="flex flex-col gap-[24px]">
        <div
          className={clsx(
            direction === 'ltr'
              ? 'xl:mr-[calc(var(--activitySpace))]'
              : 'xl:ml-[calc(var(--activitySpace))]',
            contentFont.className,
            'flex flex-col gap-[24px]',
          )}>
          {/* FILE P1 */}
          <div className="flex flex-col gap-[24px]">
            {/* FILE */}
            <div className="flex gap-[10px] items-center justify-start ">
              {/* Type */}
              <div>
                {file.type === 'pdf' && <PdfSVG />}
                {file.type === 'word' && <WordSVG />}
                {file.type === 'excel' && <ExcelSVG />}
                {file.type === 'image' && <ImageSVG />}
              </div>

              {/* Name + size */}
              <div className="flex flex-col gap-[10px]">
                <p className="text-black text-[18px] font-medium">
                  {file.name}
                </p>
                <p className="text-textGray text-[14px] font-medium">
                  {file.size}
                </p>
              </div>
            </div>

            {/* actions */}
            <div className="flex gap-[16px] items-center">
              <Button
                text={t('files.viewMetaData')}
                onClick={() => {}}
                variant="fill"
              />
              <Button
                text={t('files.uploadNewVersion')}
                onClick={() => {}}
                variant="outline"
              />
            </div>
          </div>

          {/* FILE P2 */}
          <div className="flex flex-col gap-[24px]">
            <div className="flex justify-between items-center flex-col md:flex-row gap-[24px] md:gap-[48px]">
              <div className="flex-grow">
                <HeadText bigSpace={false}>{t('files.documentId')}</HeadText>
                <Input readOnly={true} value={1259} />
              </div>
              <div className="flex-grow">
                <HeadText bigSpace={false}>{t('files.ocrLanguage')}</HeadText>
                <Input readOnly={true} value={'English'} />
              </div>
            </div>
            <div>
              <HeadText bigSpace={false}>{t('files.lock')}</HeadText>
              <Button
                text={t('files.lockButton')}
                onClick={() => {}}
                variant="fill"
                expand={true}
              />
            </div>
          </div>

          {/* FILE P3 */}
          <div>
            <HeadText>{t('files.otherVersions')}</HeadText>

            <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
              <table
                className={clsx(
                  'table-auto w-full min-w-[700px] border-collapse',
                  contentFont.className,
                  'table',
                )}>
                <thead className="rounded-[32px]">
                  <tr className="font-semibold text-[20px] border-b-solid border-b-tableBorder ">
                    <td>{t('files.uploaded')}</td>
                    <td>{t('files.fileName')}</td>
                    <td>{t('files.restore')}</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody className="">
                  {versions.map((version, index) => {
                    return (
                      <tr key={index}>
                        <td>{version.uploaded}</td>
                        <td>{version.name}</td>
                        <td>
                          <button onClick={() => {}}>
                            <RestoreSVG />
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => {}}
                            className="flex items-center justify-center gap-[10px] items-center w-[100%]">
                            <RemoveSVG />
                            <p className="text-dangerColor text-[16px] font-normal">
                              {t('general.remove')}
                            </p>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ActivitySection />
      </div>
    </div>
  );
};

export default Page;

