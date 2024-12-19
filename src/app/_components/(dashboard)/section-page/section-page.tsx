'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';
import ActivitySection from '@/app/_components/(dashboard)/activity-logs/activity-section';
import StackUsers from '@/app/_components/(dashboard)/general/stack';
import VerticalDotsSVG from '@/app/_components/svgs/general/vertical-dots';
import Folders from '@/app/_components/(dashboard)/folders/folders';
import ToolBar from '@/app/_components/navbars/toolbar';
import Link from 'next/link';
import DeleteFolderModal from '../modals/delete-folder-modal';
import ItemModal from '../modals/item-modal';
import FolderListItem from '../folders/folder-list-item';

const SectionPage = ({ folders, sectionName, path, type, id }) => {
  const t = useTranslations();

  const [view, setView] = useState('grid');
  const [isFolderOpen, setIsFolderOpen] = useState(false);

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
                  <FolderListItem
                    key={folder.id}
                    folder={folder}
                    sectionName={sectionName}
                  />
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

