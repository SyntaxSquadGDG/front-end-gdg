'use client';

import ClosedSelectArrowSVG from '@app/_components/svgs/guest/forms/closed-select-arrow';
import OpenedSelectArrowSVG from '@app/_components/svgs/guest/forms/opened-select-arrow';
import useClickOutside from '@app/_hooks/useclickoutside';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useState, useRef } from 'react';

const CustomSelect = ({ label, options, value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const t = useTranslations();

  useClickOutside(selectRef, () => setIsOpen(false));

  return (
    <div
      className={clsx(
        'w-full flex flex-col gap-[16px]',
        contentFont.className,
      )}>
      <label
        className="block text-[18px] text-textLight"
        onClick={() => setIsOpen((old) => !old)}>
        {label}
      </label>

      <div className="relative flex flex-col gap-[16px]" ref={selectRef}>
        <div
          className="flex items-center justify-between border-[1px] border-solid border-secondaryColor1 rounded-[16px] cursor-pointer bg-transparent py-[22px] px-[16px]"
          onClick={() => setIsOpen((prev) => !prev)}>
          {value && options.some((opt) => opt.value === value) ? (
            <span className="text-textLight">
              {options.find((opt) => opt.value === value)?.label}
            </span>
          ) : (
            <span className="text-placeHolderColor">{t('general.select')}</span>
          )}
          <span className="">
            {isOpen && <OpenedSelectArrowSVG />}
            {!isOpen && <ClosedSelectArrowSVG />}
          </span>
        </div>

        {error && (
          <p className="text-errorColor font-medium text-[14px]">{error}</p>
        )}

        {isOpen && (
          <ul className="absolute top-[72px] left-0 z-10 w-full bg-white border-[1px] border-solid border-secondaryColor1 rounded-[16px] max-h-[240px] overflow-y-auto">
            {options.map((option) => (
              <li
                key={option.value}
                className={`py-[22px] px-[16px] cursor-pointer text-mainColor1 font-medium ${
                  option.value === value
                    ? 'bg-secondaryColor1 '
                    : 'hover:bg-secondaryColor2'
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;

