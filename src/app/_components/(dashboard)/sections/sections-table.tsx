'use client';

import React from 'react';
import SectionTableItem from './section-table-item';
import clsx from 'clsx';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'next-intl';
import SettingsSVG from '@app/_components/svgs/general/settings';
import DocumentSVG from '@app/_components/svgs/chat/document';
import DocumentsSVG from '@app/_components/svgs/guest/documents';

const SectionsTable = ({ sections }) => {
  const t = useTranslations();
  return (
    <>
      <div className="w-full rounded-[32px] h-fit shadow-tableShadow overflow-x-auto">
        <table className={clsx('font-content', 'table')}>
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
              return <SectionTableItem key={section.id} section={section} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SectionsTable;

