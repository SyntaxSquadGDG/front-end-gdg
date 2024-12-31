'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import ViewSVG from '@app/_components/svgs/employees/view';
import FileIcon from '../general/file-icon';
import ScoreText from '../general/score-text';
import ShowMore from '../general/show-more';

const SearchTable = ({ results, hasNext, isFetching, fetchNext }) => {
  const t = useTranslations();
  return (
    <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
      <table className={clsx(contentFont.className, 'table')}>
        <thead>
          <tr>
            <td>{t('search.file')}</td>
            <td>{t('search.fileName')}</td>
            <td>{t('search.similarityScore')}</td>
            <td>{t('search.path')}</td>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <div className="flex items-center justify-center">
                    <FileIcon type={item.type} />
                  </div>
                </td>
                <td>
                  <Link href={`/files/${item.id}`}>{item.name}</Link>
                </td>
                <td>{<ScoreText score={item.score} />}</td>
                <td>{item.path}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ShowMore hasNext={hasNext} isFetching={isFetching} onClick={fetchNext} />
    </div>
  );
};

export default SearchTable;

