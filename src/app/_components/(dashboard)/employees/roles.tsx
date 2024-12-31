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
import {
  fetchEmployeeRoles,
  fetchRolesClient,
} from '@app/_utils/fetch/queries';
import LoadingSpinner from '../general/loader';
import NoToShow from '../general/no-to-show';
import ShowMore from '../general/show-more';

const RolesTable = ({ id, full = false }) => {
  const t = useTranslations();

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isFetching: isFetchingRoles,
    isError: isRolesError,
    fetchNextPage: fetchNextRoles,
    hasNextPage: hasNextRoles,
  } = useInfiniteQuery({
    queryKey: ['roles'],
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam = 1 }) => {
      // if (pageParam === 1) {
      //   return initialRoles;
      // }
      return fetchEmployeeRoles(pageParam, 5, id); // Return initial data if provided
    },
    getNextPageParam: (lastPage, pages) => {
      const hasData = lastPage.length > 0;

      const isLastPage = !hasData || lastPage.length < 5; // Adjust length based on how many items are expected per page

      return hasData && !isLastPage ? pages.length + 1 : undefined;
    },
  });

  let roles = rolesData?.pages?.flat() || []; // Flatten the pages to get all roles in one array

  if (!full) {
    roles = roles.slice(0, 5);
  }

  if (isLoadingRoles) {
    return <LoadingSpinner full={false} />;
  }

  if (roles.length === 0) {
    return <NoToShow>{t('zero.roles')}</NoToShow>;
  }

  return (
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
  );
};

export default RolesTable;

