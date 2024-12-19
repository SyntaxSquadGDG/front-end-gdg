'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';
import ActivitySection from '@/app/_components/(dashboard)/activity-logs/activity-section';
import Sections from './sections';
import StackUsers from '@/app/_components/(dashboard)/general/stack';
import VerticalDotsSVG from '../../svgs/general/vertical-dots';
import './table.css';
import Modal from '../modals/modal';
import Link from 'next/link';
import ToolBar from '../../navbars/toolbar';
import { useModal } from '@app/_contexts/modal-provider';
import DeleteSectionModal from '../modals/delete-section-modal';
import ItemModal from '../modals/item-modal';

const SectionsPage = ({ sections }) => {
  const t = useTranslations();

  const { modalStack, openModal, closeModal } = useModal();
  const [view, setView] = useState('grid');
  const [isOpen, setIsOpen] = useState(false);

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
                      <div className="relative flex justify-end">
                        <button onClick={() => setIsOpen(true)}>
                          <VerticalDotsSVG />
                        </button>

                        <ItemModal
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          modalName={`deleteModal${section.id}`}
                        />
                        <DeleteSectionModal id={section.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!sections && <h2>Error while Loading sections</h2>}
    </div>
  );
};

export default SectionsPage;

