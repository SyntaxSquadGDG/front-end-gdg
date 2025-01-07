'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';
import EmployeeItemTable from './employee-item-table';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getNextPage } from '@app/_utils/fetch';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { getErrorText } from '@app/_utils/translations';
import DataFetching from '../general/data-fetching';
import { fetchRoleEmployees } from '../employees/data/queries';

const EmployeesTable = ({ id, full = false }) => {
  const t = useTranslations();
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;

  const [sortConfig, setSortConfig] = useState({
    key: 'id', // Default column to sort by
    direction: 'asc', // Default sorting direction
  });

  const {
    data: employeesData,
    isLoading: isLoadingEmployees,
    isFetching: isFetchingEmployees,
    error,
    fetchNextPage: fetchNextEmployees,
    hasNextPage: hasNextEmployees,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['roleEmployees', id],
    queryFn: ({ pageParam = 1 }) => {
      return fetchRoleEmployees(id, pageParam, paginationPageLimit); // Return initial data if provided
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  let employees = employeesData?.pages?.flat() || []; // Flatten the pages to get all employees in one array

  if (!full) {
    employees = employees.slice(0, 5);
  }

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

  const errorText = getErrorText(
    t,
    `employees.errors.${error?.message}`,
    `employees.errors.EMPLOYEES_LOAD_ERROR`,
  );

  return (
    <DataFetching
      data={employees}
      isLoading={isLoadingEmployees}
      emptyError={t('employees.errors.EMPLOYEES_ZERO_ERROR')}
      refetch={refetch}
      error={error && errorText}>
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
                  onClick={() => handleSort('email')}
                  style={{ cursor: 'pointer' }}>
                  {t('employees.email')}
                  {sortConfig.key === 'email' &&
                    (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map((employee) => {
                return (
                  <EmployeeItemTable
                    employee={employee}
                    roleId={id}
                    key={employee.id}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        {full && (
          <ShowMore
            hasNext={hasNextEmployees}
            isFetching={isFetchingEmployees}
            onClick={fetchNextEmployees}
          />
        )}
      </div>
    </DataFetching>
  );
};

export default EmployeesTable;

