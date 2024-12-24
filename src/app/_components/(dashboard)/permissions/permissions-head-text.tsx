import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const PermissionsHeadText = ({ children }) => {
  return (
    <p
      className={clsx(
        contentFont.className,
        'text-[18px] font-medium text-mainColor1 mb-[16px]',
      )}>
      {children}
    </p>
  );
};

export default PermissionsHeadText;

