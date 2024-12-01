'use client';
import React, { useState } from 'react';
import Folders from '../folders/folders';
import ActivitySection from '../activity-logs/activity-section';
import Files from '../files/files';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';
import PathArrowSVG from '../svgs/general/path-arrow';
import { useTranslations } from 'next-intl';
import GridViewSVG from '../svgs/sections/grid-view';
import ListViewSVG from '../svgs/sections/list-view';
import FileAddAiSVG from '../svgs/files/file-add-ai';
import AddSVG from '../svgs/general/add';
import AddFolderSVG from '../svgs/folders/add';
import AddFileSVG from '../svgs/files/add';
import Modal from '../modals/modal';
import StackUsers from '../general/stack';
import VerticalDotsSVG from '../svgs/general/vertical-dots';
import Link from 'next/link';
import ToolBar from '../navbars/toolbar';

const FoldersPage = ({ folderData, sectionName, path }) => {
  const [view, setView] = useState('grid');
  const t = useTranslations();
  const [modalStack, setModalStack] = useState([]);

  const openModal = (modalId) => {
    setModalStack((prevStack) => [...prevStack, modalId]); // Push new modal to the stack
  };

  const closeModal = () => {
    setModalStack((prevStack) => prevStack.slice(0, -1)); // Remove the top modal from the stack
  };

  const activeView =
    'px-[28px] py-[12px] rounded-[32px] bg-gradient-to-r from-[#CDAD8F] via-[#CDAD8F] to-[#FAE1CB]';

  const reversedPath = [...path].reverse();

  return (
    <div>
      {/* TOOLBAR */}
      <ToolBar path={path} views={true} view={view} setView={setView} />

      {view === 'grid' && (
        <div className={'flex flex-col gap-[32px]'}>
          <Folders folders={folderData.folders} sectionName={sectionName} />
          <Files files={folderData.files} />
          <ActivitySection />
        </div>
      )}

      {view === 'list' && (
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

      <Modal
        isOpen={modalStack.includes('createFolder')}
        onClose={closeModal}
        className={contentFont.className}>
        <h2 className="text-xl font-bold mb-[16px]">{t('folders.new')}</h2>
        <input
          type="text"
          className="w-[100%] py-[20px] rounded-[8px] px-[16px] border-[1px] border-solid border-blue1 outline-none mb-[16px]"
        />
        <input
          type="submit"
          className="w-[100%] py-[20px] rounded-[8px] px-[16px] bg-blue1 outline-none text-textLight"
        />
      </Modal>
    </div>
  );
};

export default FoldersPage;

