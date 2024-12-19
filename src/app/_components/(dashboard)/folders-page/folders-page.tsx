'use client';
import React, { useState } from 'react';
import Folders from '../folders/folders';
import ActivitySection from '@/app/_components/(dashboard)/activity-logs/activity-section';
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
import FileIcon from '../general/file-icon';
import { useModal } from '@app/_contexts/modal-provider';
import DeleteFileModal from '../modals/delete-file-modal';
import ItemModal from '../modals/item-modal';
import DeleteFolderModal from '../modals/delete-folder-modal';
import FolderListItem from '../folders/folder-list-item';
import FileListItem from '../files/file-list-item';

const FoldersPage = ({ folderData, sectionName, path, id, type }) => {
  const [view, setView] = useState('grid');
  const t = useTranslations();
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const { openModal, closeModal, modalStack } = useModal();

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
        <>
          <p className={clsx(contentFont, 'mb-[24px] text-[22px] font-medium')}>
            {t('folders.folders')}
          </p>
          <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto mb-[24px]">
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
                    <FolderListItem
                      folder={folder}
                      sectionName={sectionName}
                      key={folder.id}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className={clsx(contentFont, 'mb-[24px] text-[22px] font-medium')}>
            {t('files.files')}
          </p>
          <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
            <table
              className={clsx(
                'table-auto w-full min-w-[700px] border-collapse',
                contentFont.className,
                'table',
              )}>
              <thead className="rounded-[32px]">
                <tr className="border-b-solid border-b-tableBorder ">
                  <td>{t('files.file')}</td>
                  <td>{t('files.fileName')}</td>
                  <td>{t('files.folderName')}</td>
                  <td>{t('files.lastModified')}</td>
                  <td>{t('files.size')}</td>
                  <td>{t('files.permissions')}</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="">
                {folderData.files.map((file) => {
                  return <FileListItem file={file} path={path} key={file.id} />;
                })}
              </tbody>
            </table>
          </div>{' '}
        </>
      )}

      {!folderData && <h2>Error while Fetching folder data</h2>}
    </div>
  );
};

export default FoldersPage;

