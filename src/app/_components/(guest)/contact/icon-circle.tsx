'use client';
import Link from 'next/link';
import React from 'react';

const IconCircle = ({ SVG, href }) => {
  return (
    <Link
      className="w-[46px] h-[46px] rounded-full border-[1px] border-solid border-secondaryColor1 p-20px flex items-center justify-center bg-transparent hover:bg-secondaryColor1 duration-500"
      href={href}>
      <div className="shrink-0">
        <SVG />
      </div>
    </Link>
  );
};

export default IconCircle;

