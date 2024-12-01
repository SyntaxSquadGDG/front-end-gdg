'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import SectionsSVG from '../svgs/sections/sections';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';
import GridViewSVG from '../svgs/sections/grid-view';
import ListViewSVG from '../svgs/sections/list-view';
import SectionItem from './section-item';
import ActivityItem from '../activity-logs/activity-item';
import ActivitySection from '../activity-logs/activity-section';
import Sections from './sections';
import StackUsers from '../general/stack';
import VerticalDotsSVG from '../svgs/general/vertical-dots';
import Folders from './folders';
import PathArrowSVG from '../svgs/general/path-arrow';
import Modal from '../modals/modal';

const folders = [
  {
    name: 'Folder Name',
    section: {
      name: 'Section Name',
    },
    id: Math.random() * Math.random(),
    filesCount: 20,
    employeesCount: 20,
    lastModified: '2024-02-02',
    storage: 50,
  },
  {
    name: 'Folder Name',
    section: {
      name: 'Section Name',
    },
    id: Math.random() * Math.random(),
    filesCount: 20,
    employeesCount: 20,
    lastModified: '2024-02-02',
    storage: 50,
  },
];

const SectionPage = ({ section }) => {
  const t = useTranslations();
  const [view, setView] = useState('grid');
  const activeView =
    'px-[28px] py-[12px] rounded-[32px] bg-gradient-to-r from-[#CDAD8F] via-[#CDAD8F] to-[#FAE1CB]';

  const [modalStack, setModalStack] = useState([]);

  const openModal = (modalId) => {
    setModalStack((prevStack) => [...prevStack, modalId]); // Push new modal to the stack
  };

  const closeModal = () => {
    setModalStack((prevStack) => prevStack.slice(0, -1)); // Remove the top modal from the stack
  };

  return (
    <div>
      {/* TOOLBAR */}
      <div className="flex justify-between flex-wrap mb-[32px]">
        {/* Sections Text */}
        <div className="flex gap-[16px] items-center flex-wrap">
          <h2
            className={clsx(contentFont.className, 'text-[26px] font-medium')}>
            {t('sections.sections')}
          </h2>
          <PathArrowSVG />
          <h2
            className={clsx(contentFont.className, 'text-[26px] font-medium')}>
            {section.name}
          </h2>
        </div>
        {/* VIEWS AND CREATION */}
        <div className="flex gap-[16px] items-center flex-wrap">
          {/* VIEWS */}
          <div className="rounded-[32px] flex items-center border-[1px] border-solid border-blue1 w-fit">
            <button
              className={clsx(
                view === 'grid' ? activeView : 'pr-[12px] pl-[21px]',
              )}
              onClick={() => setView('grid')}>
              <GridViewSVG />
            </button>
            <button
              className={clsx(
                view === 'list' ? activeView : 'pl-[12px] pr-[21px]',
              )}
              onClick={() => setView('list')}>
              <ListViewSVG />
            </button>
          </div>

          {/* CREATION */}
          <button
            className={clsx(
              'flex gap-[10px] items-center h-fit px-[32px] py-[6px] rounded-[10px] bg-gradient-to-r from-blue1 to-blue2 w-fit text-textLight',
              contentFont.className,
            )}
            onClick={() => console.log('???')}>
            <p className="text-[18px] font-medium">{t('files.addAI')}</p>
            <p className="text-[28px]">+</p>
          </button>

          <button
            className={clsx(
              'flex gap-[10px] items-center h-fit px-[32px] py-[6px] rounded-[10px] border-[1px] border-solid border-blue1 w-fit',
              contentFont.className,
            )}
            onClick={() => openModal('createFolder')}>
            <p className="text-[18px] font-medium">{t('folders.create')}</p>
            <p className="text-[28px]">+</p>
          </button>
        </div>
      </div>

      {view === 'grid' && (
        <div>
          <Folders />
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
                    <td>{folder.name}</td>
                    <td>{folder.section.name}</td>
                    <td>{folder.filesCount}</td>
                    <td>{folder.lastModified}</td>
                    <td>{folder.storage}</td>
                    <td>
                      <div className="flex w-[100%] h-[100%] items-center justify-center">
                        <StackUsers employeesCount={folder.employeesCount} />
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

export default SectionPage;

