'use client';
import clsx from 'clsx';
import React from 'react';

const MenuBar = ({ isMenuOpen, openStyle, closeStyle }) => {
  return (
    <span
      className={clsx(
        'block w-6 h-1 bg-textLight rounded transition duration-300 group-hover:bg-secondaryColor1',
        isMenuOpen ? openStyle : closeStyle,
      )}
    />
  );
};

export default MenuBar;

