'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import StackUsers from './stack';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';

const Table = () => {
  const t = useTranslations();
  const sections = [
    {
      id: 1,
      name: 'trial',
      numberOfFolders: 1,
      lastModified: '2024',
      size: 500,
      numberOfEmployees: 3,
    },
  ];
  return (
    <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
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
            return (
              <tr key={section.id}>
                <td>
                  <Link href={`/sections/${section.id}`}>{section.name}</Link>
                </td>
                <td>{section.numberOfFolders}</td>
                <td>{section.lastModified}</td>
                <td>{section.size}</td>
                <td>
                  <div className="flex w-[100%] h-[100%] items-center justify-center">
                    <StackUsers employeesCount={section.numberOfEmployees} />
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
  );
};

export default Table;

