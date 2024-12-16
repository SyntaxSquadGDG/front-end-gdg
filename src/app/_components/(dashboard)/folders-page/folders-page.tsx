'use client';
import React, { useState } from 'react';
import Folders from '../folders/folders';
import ActivitySection from '../(dashboard)/activity-logs/activity-section';
import Files from '../files/files';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';
import PathArrowSVG from '../../svgs/general/path-arrow';
import { useTranslations } from 'next-intl';
import GridViewSVG from '../../svgs/sections/grid-view';
import ListViewSVG from '../../svgs/sections/list-view';
import FileAddAiSVG from '../../svgs/files/file-add-ai';
import AddSVG from '../../svgs/general/add';
import AddFolderSVG from '../../svgs/folders/add';
import AddFileSVG from '../../svgs/files/add';
import Modal from '../modals/modal';
import StackUsers from '../general/stack';
import VerticalDotsSVG from '../../svgs/general/vertical-dots';
import Link from 'next/link';
import ToolBar from '../../navbars/toolbar';

const FoldersPage = ({ folderData, sectionName, path, id, type }) => {
  const [view, setView] = useState('grid');
  const t = useTranslations();

  return (
    <div>
      {/* TOOLBAR */}
      <ToolBar
        path={path}
        views={true}
        view={view}
        setView={setView}
        id={id}
        type={type}
      />

      {folderData && view === 'grid' && (
        <div className={'flex flex-col gap-[32px]'}>
          <Folders folders={folderData.folders} sectionName={sectionName} />
          <Files files={folderData.files} />
          <ActivitySection />
        </div>
      )}

      {folderData && view === 'list' && (
        <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
          <table
            className={clsx(
              'table-auto w-full min-w-[700px] border-collapse',
              contentFont.className,
              'table',
            )}>
            <thead className="rounded-[32px]">
              <tr className="border-b-solid border-b-tableBorder ">
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
              {folderData.folders.map((folder) => {
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

      {!folderData && <h2>Error while Fetching folder data</h2>}
    </div>
  );
};

export default FoldersPage;

