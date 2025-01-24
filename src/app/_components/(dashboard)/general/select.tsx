'use client';

import ClosedSelectArrowSVG from '@app/_components/svgs/guest/forms/closed-select-arrow';
import OpenedSelectArrowSVG from '@app/_components/svgs/guest/forms/opened-select-arrow';
import useClickOutside from '@app/_hooks/useclickoutside';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useState, useRef } from 'react';
import SelectedSelect from './selected-select';
import { useInfiniteQuery } from '@tanstack/react-query';
import { BASE_URL } from '@app/_utils/fetch/fetch';
import { extendCustomSelect, extendSelect } from '@app/_utils/helper';
import LoadingSpinner from './loader';

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  error,
  errorData,
  onScroll,
  endPoint,
  dataToExtend,
  isFetchingData,
  isLoadingData,
  selectedItems,
  fetchNextData,
  hasNextData,
  disabled,
}) => {
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

  const handleScroll = (event) => {
    console.log('???');
    const bottom =
      event.target.scrollHeight ===
      event.target.scrollTop + event.target.clientHeight;
    if (bottom) {
      console.log('BOTTOM');
    }
    if (hasNextData) {
      console.log('HAS');
    }
    if (bottom && !isFetchingData && hasNextData) {
      console.log('????????????');
      fetchNextData(); // Fetch the next page of employees
    }
  };

  // const {
  //   data,
  //   isLoading,
  //   isFetching,
  //   isError,
  //   fetchNextPage,
  //   hasNextPage,
  //   refetch,
  // } = useInfiniteQuery({
  //   queryKey: ['searchEmployees', searchQuery],
  //   queryFn: async ({ pageParam = 1 }) => {
  //     if (searchQuery.trim() === '') return { results: [], totalResults: 0 }; // No query, return empty result

  //     const response = await fetch(
  //       `${BASE_URL}${endPoint}?query=${searchQuery}&page=${pageParam}&limit=5`,
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     return data;
  //   },
  //   getNextPageParam: (lastPage, pages) => {
  //     const hasData = lastPage.length > 0;

  //     const isLastPage = !hasData || lastPage.length < 5; // Adjust length based on how many items are expected per page

  //     return hasData && !isLastPage ? pages.length + 1 : undefined;
  //   },
  //   refetchOnWindowFocus: false,
  // });

  // const handleSearchScroll = (event) => {
  //   const bottom =
  //     event.target.scrollHeight ===
  //     event.target.scrollTop + event.target.clientHeight;
  //   if (bottom && !isFetching && hasNextPage) {
  //     fetchNextPage(); // Fetch the next page of employees
  //   }
  // };

  // const initialData = data?.pages?.flat() || []; // Flatten the pages to get all employees in one array
  // const searchData = extendSelect(
  //   initialData ? initialData : [],
  //   dataToExtend,
  //   'id',
  // );

  // const filteredSearchData = searchData
  //   ? searchData.filter((item) => !selectedItems.includes(item.id))
  //   : [];

  const toRender = options;

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
            value={
              errorData
                ? `${t('zero.loadFail')} ${errorData} ${t('zero.tryLater')}`
                : searchQuery
            }
            disabled={errorData || disabled}
            onChange={(e) => {
              setIsOpen(true);
              setSearchQuery(e.target.value);
            }}
            className={clsx(
              'w-full p-[16px] focus:outline-none rounded-[8px]',
              errorData && 'text-red-400',
            )}
          />

          {!errorData && (
            <span className="mx-[16px]">
              {isOpen ? <span>^</span> : <span>v</span>}
            </span>
          )}
        </div>

        {error && (
          <p className="text-errorColor font-medium text-[14px]">{error}</p>
        )}

        {isOpen && !errorData && (
          <div
            onScroll={(e) => {
              handleScroll(e);
              // handleSearchScroll(e);
            }}
            className="absolute top-[72px] left-0 z-10 w-full bg-white border-[1px] border-solid border-mainColor3 rounded-[8px] max-h-[240px] overflow-y-auto">
            {/* Search input inside the select */}
            <ul>
              {toRender.length > 0 ? (
                toRender.map((option) => (
                  <li
                    key={option.value}
                    className="py-[22px] px-[16px] cursor-pointer text-mainColor1 font-medium hover:bg-mainColor3 hover:text-textLight flex flex-col gap-[8px]"
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                      // setSearchQuery(''); // Clear the search query when selecting a role
                    }}>
                    <p className="font-bold text-[20px]">{option.label}</p>
                    <p>{option.value}</p>
                  </li>
                ))
              ) : (
                <>
                  {!isFetchingData && !isLoadingData && (
                    <li className="py-[22px] px-[16px] text-mainColor1 font-medium">
                      {t('general.noResults')}
                    </li>
                  )}
                </>
              )}
              {(isFetchingData || isLoadingData) && (
                <LoadingSpinner full={false} />
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;

