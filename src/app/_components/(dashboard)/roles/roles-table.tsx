'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import ViewSVG from '@app/_components/svgs/employees/view';
import RoleItemTable from './role-item-table';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRolesClient } from '@app/_utils/fetch/queries';
import LoadingSpinner from '../general/loader';
import NoToShow from '../general/no-to-show';
import ShowMore from '../general/show-more';
import { getErrorText } from '@app/_utils/translations';
import { getNextPage } from '@app/_utils/fetch';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { fetchMyRoles, fetchRoles } from './data/queries';
import DataFetching from '../general/data-fetching';

const RolesTable = ({ my = false }) => {
  const t = useTranslations();
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;
  const [errorText, setErrorText] = useState(null);

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isFetching: isFetchingRoles,
    error,
    fetchNextPage: fetchNextRoles,
    hasNextPage: hasNextRoles,
  } = useInfiniteQuery({
    queryKey: ['roles'],
    queryFn: ({ pageParam = 1 }) => {
      return my
        ? fetchMyRoles(pageParam, paginationPageLimit)
        : fetchRoles(pageParam, paginationPageLimit); // Return initial data if provided
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  const roles = rolesData?.pages?.flat() || []; // Flatten the pages to get all roles in one array

  useEffect(() => {
    const errorText = getErrorText(
      t,
      `roles.errors.${error?.message}`,
      `roles.errors.ROLES_LOAD_ERROR`,
    );
    setErrorText(errorText);
  }, [error]);

  return (
    <DataFetching
      data={roles}
      emptyError={t('roles.errors.ROLES_ZERO_ERROR')}
      error={error && errorText}
      isLoading={isLoadingRoles}>
      <div className="tableDiv">
        <div>
          <table className={clsx(contentFont.className, 'table')}>
            <thead>
              <tr>
                <td></td>
                <td>{t('roles.id')}</td>
                <td>{t('roles.name')}</td>
                <td>{t('roles.members')}</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => {
                return <RoleItemTable role={role} key={role.id} />;
              })}
            </tbody>
          </table>
        </div>
        <ShowMore
          hasNext={hasNextRoles}
          isFetching={isFetchingRoles}
          onClick={fetchNextRoles}
        />
      </div>
    </DataFetching>
  );
};

export default RolesTable;

