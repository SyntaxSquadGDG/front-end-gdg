'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';
import ActivitySection from '../activity-logs/activity-section';
import StackUsers from '../general/stack';
import VerticalDotsSVG from '../svgs/general/vertical-dots';
import Folders from '../folders/folders';
import ToolBar from '../navbars/toolbar';
import Link from 'next/link';

const SectionPage = ({ folders, sectionName, path, type, id }) => {
  const t = useTranslations();

  const [view, setView] = useState('grid');

  return (
    <div>
      {/* TOOLBAR */}
      <ToolBar
        views={true}
        view={view}
        setView={setView}
        path={path}
        addFiles={false}
        type={type}
        id={id}
      />

      {folders && view === 'grid' && (
        <div className={'flex flex-col gap-[32px]'}>
          <Folders folders={folders} sectionName={sectionName} />
          <ActivitySection />
        </div>
      )}

      {folders && view === 'list' && (
        <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
          <table
            className={clsx(
              'table-auto w-full min-w-[700px] border-collapse',
              contentFont.className,
              'table',
            )}>
            <thead className="rounded-[32px]">
              <tr className="font-semibold text-[20px] border-b-solid border-b-tableBorder ">
                <td>{t('folders.name')}</td>
                <td>{t('folders.section')}</td>
                <td>{t('folders.filesCount')}</td>
                <td>{t('folders.lastModified')}</td>
                <td>{t('folders.size')}</td>
                <td>{t('folders.permissions')}</td>
                <td></td>
              </tr>
            </thead>
            <tbody className="">
              {folders.map((folder) => {
                return (
                  <tr
                    key={folder.id}
                    className="py-[40px] font-medium text-[18px] rounded-[32px]">
                    <td>
                      <Link href={`/folders/${folder.id}`}>{folder.name}</Link>
                    </td>
                    <td>{sectionName}</td>
                    <td>{folder.numberOfFiles}</td>
                    <td>{folder.lastModified}</td>
                    <td>{folder.size}</td>
                    <td>
                      <div className="flex w-[100%] h-[100%] items-center justify-center">
                        <StackUsers employeesCount={folder.numberOfEmployees} />
                      </div>
                    </td>
                    <td>
                      <VerticalDotsSVG />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!folders && <h2>Error While fetching folders</h2>}
    </div>
  );
};

export default SectionPage;

