'use client';
import MoreSVG from '@app/_components/svgs/general/more';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';

const ShowMore = ({ hasNext, isFetching, onClick }) => {
  const t = useTranslations();
  return (
    <>
      {hasNext && (
        <div className="w-[100%] flex items-center justify-center showMore">
          <button
            className="py-[24px] w-[100%] flex items-center justify-center gap-[8px]"
            onClick={() => onClick()}
            disabled={!hasNext || isFetching}>
            <MoreSVG />
            <p
              className={clsx(
                contentFont.className,
                'text-[18px] font-medium',
              )}>
              {isFetching ? t('general.loading') : t('general.more')}
            </p>
          </button>
        </div>
      )}
    </>
  );
};

export default ShowMore;
