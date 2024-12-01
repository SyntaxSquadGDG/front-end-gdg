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
import './table.css';
import Modal from '../modals/modal';
import AddSVG from '../svgs/general/add';
import FileAddAiSVG from '../svgs/files/file-add-ai';
import Link from 'next/link';

const sections = [
  {
    name: 'Section Name',
    id: Math.random() * Math.random(),
    foldersCount: 20,
    employeesCount: 20,
    lastModified: '2024-02-02',
    storage: 50,
  },
  {
    name: 'Section Name',
    id: Math.random() * Math.random(),
    foldersCount: 20,
    employeesCount: 20,
    lastModified: '2024-02-02',
    storage: 50,
  },
];

const SectionsPage = ({ sections }) => {
  const t = useTranslations();
  const [modalStack, setModalStack] = useState([]);

  const openModal = (modalId) => {
    setModalStack((prevStack) => [...prevStack, modalId]); // Push new modal to the stack
  };

  const closeModal = () => {
    setModalStack((prevStack) => prevStack.slice(0, -1)); // Remove the top modal from the stack
  };

  const [view, setView] = useState('grid');
  const activeView =
    'px-[28px] py-[12px] rounded-[32px] bg-gradient-to-r from-[#CDAD8F] via-[#CDAD8F] to-[#FAE1CB]';
  return (
    <div>
      {/* TOOLBAR */}
      <div className="flex justify-between flex-wrap mb-[32px]">
        {/* Sections Text */}
        <div className="flex gap-[16px] items-center">
          <h2
            className={clsx(contentFont.className, 'text-[26px] font-medium')}>
            {t('sections.sections')}
          </h2>
          <SectionsSVG />
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
              'flex gap-[10px] items-center h-fit px-[32px] py-[10px] rounded-[10px] bg-gradient-to-r from-blue1 to-blue2 w-fit text-textLight',
              contentFont.className,
            )}
            onClick={() => console.log('???')}>
            <FileAddAiSVG />
            <p className="text-[18px] font-medium">{t('files.addAI')}</p>
          </button>

          <button
            className={clsx(
              'flex gap-[10px] items-center h-fit px-[32px] py-[10px] rounded-[10px] border-[1px] border-solid border-blue1 w-fit',
              contentFont.className,
            )}
            onClick={() => openModal('createSection')}>
            <p className="text-[18px] font-medium">{t('sections.create')}</p>
            <AddSVG />
          </button>
        </div>
      </div>

      {view === 'grid' && (
        <div className={'flex flex-col gap-[32px]'}>
          <Sections sections={sections} />
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
                <td>{t('sections.name')}</td>
                <td>{t('sections.foldersCount')}</td>
                <td>{t('sections.lastModified')}</td>
                <td>{t('sections.size')}</td>
                <td>{t('sections.permissions')}</td>
                <td></td>
              </tr>
            </thead>
            <tbody className="">
              {sections.map((section) => {
                return (
                  <tr
                    key={section.id}
                    className="py-[40px] font-medium text-[18px] rounded-[32px]">
                    <td>
                      <Link href={`/sections/${section.id}`}>
                        {section.name}
                      </Link>
                    </td>
                    <td>{section.numberOfFolders}</td>
                    <td>{section.lastModified}</td>
                    <td>{section.size}</td>
                    <td>
                      <div className="flex w-[100%] h-[100%] items-center justify-center">
                        <StackUsers
                          employeesCount={section.numberOfEmployees}
                        />
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
        isOpen={modalStack.includes('createSection')}
        onClose={closeModal}
        className={contentFont.className}>
        <h2 className="text-xl font-bold mb-[16px]">{t('sections.new')}</h2>
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

export default SectionsPage;

