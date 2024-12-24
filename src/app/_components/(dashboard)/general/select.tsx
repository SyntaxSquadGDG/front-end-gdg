'use client';

import ClosedSelectArrowSVG from '@app/_components/svgs/guest/forms/closed-select-arrow';
import OpenedSelectArrowSVG from '@app/_components/svgs/guest/forms/opened-select-arrow';
import useClickOutside from '@app/_hooks/useclickoutside';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useState, useRef } from 'react';
import SelectedSelect from './selected-select';

const CustomSelect = ({ label, options, value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const selectRef = useRef(null);
  const t = useTranslations();

  useClickOutside(selectRef, () => setIsOpen(false));

  // Filter options based on search query
  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(option.value).toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className={clsx(
        'w-full flex flex-col gap-[16px]',
        contentFont.className,
      )}>
      <label
        className="block text-[18px] text-textDark"
        onClick={() => setIsOpen((old) => !old)}>
        {label}
      </label>

      <div className="relative flex flex-col gap-[16px]" ref={selectRef}>
        <div
          className="rounded-[8px] text-[16px] font-normal text-black border-[1px] border-solid border-mainColor3 w-[100%] outline-none flex justify-between items-center"
          onClick={() => setIsOpen(true)}>
          <input
            type="text"
            placeholder={t('general.select')}
            value={searchQuery}
            onChange={(e) => {
              setIsOpen(true);
              setSearchQuery(e.target.value);
            }}
            className="w-full p-[16px] focus:outline-none rounded-[8px] "
          />

          <span className="mx-[16px]">
            {isOpen ? <span>OPEN</span> : <span>CLOSED</span>}
          </span>
        </div>

        {error && (
          <p className="text-errorColor font-medium text-[14px]">{error}</p>
        )}

        {isOpen && (
          <div className="absolute top-[72px] left-0 z-10 w-full bg-white border-[1px] border-solid border-mainColor3 rounded-[8px] max-h-[240px] overflow-y-auto">
            {/* Search input inside the select */}
            <ul>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    className="py-[22px] px-[16px] cursor-pointer text-mainColor1 font-medium hover:bg-mainColor3 hover:text-textLight flex flex-col gap-[8px]"
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                      setSearchQuery(''); // Clear the search query when selecting a role
                    }}>
                    <p className="font-bold text-[20px]">{option.label}</p>
                    <p>{option.value}</p>
                  </li>
                ))
              ) : (
                <li className="py-[22px] px-[16px] text-mainColor1 font-medium">
                  {t('general.noResults')}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;

