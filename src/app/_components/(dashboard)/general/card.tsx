import clsx from 'clsx';
import React from 'react';

const Card = ({ children }) => {
  return (
    <div
      className={clsx(
        'bg-cardColor rounded-tr-[32px] rounded-bl-[32px] px-36px py-16px w-[100%] flex flex-grow justify-center items-center',
      )}>
      {children}
    </div>
  );
};

export default Card;

