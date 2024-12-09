import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const ResultItem = async ({ item }) => {
  const t = await getTranslations();

  function getTranslatedType(type) {
    switch (type) {
      case 'PDF':
        return t('types.pdf');

      case 'Excel':
        return t('types.excel');

      case 'Word':
        return t('types.word');

      case 'Image':
        return t('types.image');

      default:
        return t('types.image');
    }
  }

  function getColoredType(type) {
    switch (type) {
      case 'PDF':
        return '#C61B54';

      case 'Excel':
        return '#5CCF4F';

      case 'Word':
        return '#190980';

      case 'Image':
        return '#6A6A6A';

      default:
        return '#6A6A6A';
    }
  }

  return (
    <li className="flex justify-between items-center gap-[24px]">
      <div className="flex gap-[8px] items-center justify-start w-[120px]">
        <div className="w-[8px] h-[8px] rounded-full bg-black"></div>
        <p className="text-[12px]">{getTranslatedType(item.name)}</p>
      </div>
      <div className="bg-white rounded-full overflow-hidden h-[6px] w-[100%]">
        <div
          className={clsx('rounded-full h-[100%]')}
          style={{
            backgroundColor: getColoredType(item.name),
            width: `${item.percentage}%`,
          }}
        />
      </div>
      <p className="text-[12px] w-[40px]">{item.percentage}%</p>
    </li>
  );
};

export default ResultItem;

