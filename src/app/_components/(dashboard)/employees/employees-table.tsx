'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';
import EmployeeItemTable from './employee-item-table';
import NoToShow from '../general/no-to-show';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchEmployeesClient } from '@app/_utils/fetch/queries';
import MoreSVG from '@app/_components/svgs/general/more';
import LoadingSpinner from '../general/loader';
import ShowMore from '../general/show-more';

const EmployeesTable = ({ initialEmployees }) => {
  const t = useTranslations();

  const [sortConfig, setSortConfig] = useState({
    key: 'id', // Default column to sort by
    direction: 'asc', // Default sorting direction
  });

  const {
    data: employeesData,
    isLoading: isLoadingEmployees,
    isFetching: isFetchingEmployees,
    isError: isEmployeesError,
    fetchNextPage: fetchNextEmployees,
    hasNextPage: hasNextEmployees,
  } = useInfiniteQuery({
    queryKey: ['employees'],
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam = 1 }) => {
      return fetchEmployeesClient(pageParam, 5); // Return initial data if provided
    },
    getNextPageParam: (lastPage, pages) => {
      const hasData = lastPage.length > 0;

      const isLastPage = !hasData || lastPage.length < 5; // Adjust length based on how many items are expected per page

      return hasData && !isLastPage ? pages.length + 1 : undefined;
    },
  });

  const employees = employeesData?.pages?.flat() || []; // Flatten the pages to get all employees in one array

  // Sorting function
  const sortedEmployees = useMemo(() => {
    const sortedData = [...employees]; // Create a shallow copy to avoid mutation
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  }, [employees, sortConfig]);

  // Handle sorting when a table header is clicked
  const handleSort = (key) => {
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig.key === key) {
        // Toggle the direction if the same column is clicked
        return {
          ...prevSortConfig,
          direction: prevSortConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        // Default to ascending direction if a new column is clicked
        return { key, direction: 'asc' };
      }
    });
  };

  // if (isFetchingEmployees) {
  //   return 'Fetching';
  // }

  if (isLoadingEmployees) {
    return <LoadingSpinner full={false} />;
  }

  if (employees.length === 0) {
    return <NoToShow>{t('zero.employees')}</NoToShow>;
  }

  return (
    <div className="tableDiv">
      <div>
        <table className={clsx(contentFont.className, 'table')}>
          <thead>
            <tr>
              <td></td>
              <td
                onClick={() => handleSort('id')}
                style={{ cursor: 'pointer' }}>
                {t('employees.id')}
                {sortConfig.key === 'id' &&
                  (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
              </td>
              <td
                onClick={() => handleSort('firstName')}
                style={{ cursor: 'pointer' }}>
                {t('employees.name')}
                {sortConfig.key === 'name' &&
                  (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
              </td>
              <td
                onClick={() => handleSort('roles')}
                style={{ cursor: 'pointer' }}>
                {t('employees.roles')}
                {sortConfig.key === 'roles' &&
                  (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
              </td>
              <td
                onClick={() => handleSort('email')}
                style={{ cursor: 'pointer' }}>
                {t('employees.email')}
                {sortConfig.key === 'email' &&
                  (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
              </td>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map((employee) => {
              return (
                <EmployeeItemTable employee={employee} key={employee.id} />
              );
            })}
          </tbody>
        </table>
      </div>

      <ShowMore
        hasNext={hasNextEmployees}
        isFetching={isFetchingEmployees}
        onClick={fetchNextEmployees}
      />
    </div>
  );
};

export default EmployeesTable;

