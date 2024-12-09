'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';
import ActivitySection from '../activity-logs/activity-section';
import Sections from './sections';
import StackUsers from '../general/stack';
import VerticalDotsSVG from '../svgs/general/vertical-dots';
import './table.css';
import Modal from '../modals/modal';
import Link from 'next/link';
import ToolBar from '../navbars/toolbar';
import { useModal } from '@app/_contexts/modal-provider';

const SectionsPage = ({ sections }) => {
  const t = useTranslations();

  const { modalStack, openModal, closeModal } = useModal();
  const [view, setView] = useState('grid');

  return (
    <div>
      {/* TOOLBAR */}
      <ToolBar
        view={view}
        setView={setView}
        views={true}
        path={null}
        pathRequired={false}
        addFiles={true}
      />

      {sections && view === 'grid' && (
        <div className={'flex flex-col gap-[32px]'}>
          <Sections sections={sections} />
          <ActivitySection />
        </div>
      )}

      {sections && view === 'list' && (
        <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
          <table className={clsx(contentFont.className, 'table')}>
            <thead>
              <tr>
                <td>{t('sections.name')}</td>
                <td>{t('sections.foldersCount')}</td>
                <td>{t('sections.lastModified')}</td>
                <td>{t('sections.size')}</td>
                <td>{t('sections.permissions')}</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => {
                return (
                  <tr key={section.id}>
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

      {!sections && <h2>Error while Loading sections</h2>}

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

