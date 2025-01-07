'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import ViewSVG from '@app/_components/svgs/employees/view';
import RoleItemTable from './role-item-table';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRolesClient } from '@app/_utils/fetch/queries';
import LoadingSpinner from '../general/loader';
import NoToShow from '../general/no-to-show';
import ShowMore from '../general/show-more';
import { fetchEmployeeRoles } from '../roles/data/queries';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { getNextPage } from '@app/_utils/fetch';
import { getErrorText } from '@app/_utils/translations';
import DataFetching from '../general/data-fetching';

const RolesTable = ({ id, full = false }) => {
  const t = useTranslations();
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;
  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isFetching: isFetchingRoles,
    error,
    fetchNextPage: fetchNextRoles,
    hasNextPage: hasNextRoles,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['employeeRoles', id],
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam = 1 }) => {
      return fetchEmployeeRoles(id, pageParam, paginationPageLimit); // Return initial data if provided
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  let roles = rolesData?.pages?.flat() || []; // Flatten the pages to get all roles in one array

  if (!full) {
    roles = roles.slice(0, paginationPageLimit);
  }
  const errorText = getErrorText(
    t,
    `roles.errors.${error?.message}`,
    `roles.errors.ROLES_LOAD_ERROR`,
  );

  return (
    <DataFetching
      data={rolesData}
      emptyError={t('roles.errors.ROLES_ZERO_ERROR')}
      error={error && errorText}
      refetch={refetch}
      isLoading={isLoadingRoles}>
      <div className="tableDiv">
        <div>
          <table className={clsx(contentFont.className, 'table')}>
            <thead>
              <tr>
                <td></td>
                <td>{t('roles.id')}</td>
                <td>{t('roles.name')}</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => {
                return (
                  <RoleItemTable role={role} employeeId={id} key={role.id} />
                );
              })}
            </tbody>
          </table>
        </div>
        {full && (
          <ShowMore
            hasNext={hasNextRoles}
            isFetching={isFetchingRoles}
            onClick={fetchNextRoles}
          />
        )}
      </div>
    </DataFetching>
  );
};

export default RolesTable;

