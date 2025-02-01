'use client';
import clsx from 'clsx';
import React from 'react';

const GoogleButton = ({ className, variant = 'default' }) => {
  return (
    <button
      className={clsx('w-fit', className, 'hover:opacity-70 duration-500')}>
      <img
        src={
          variant === 'default'
            ? '/images/guest/common/google-play.png'
            : '/images/guest/common/google-play-footer.png'
        }
        className={variant === 'default' ? 'h-[80px]' : 'h-[62px]'}
        alt=""
      />
    </button>
  );
};

export default GoogleButton;

