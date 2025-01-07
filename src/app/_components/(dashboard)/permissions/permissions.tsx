'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import PermissionItem from './permission-item';
import { useInfiniteQuery } from '@tanstack/react-query';
import ShowMore from '../general/show-more';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { fetchRolePermissions } from '../roles/data/queries';
import { getNextPage } from '@app/_utils/fetch';
import { getErrorText } from '@app/_utils/translations';
import DataFetching from '../general/data-fetching';
import { fetchEmployeePermissions } from '../employees/data/queries';

const Permissions = ({ id, type, full = false }) => {
  const t = useTranslations();
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;

  const {
    data: permissionsData,
    isLoading: isLoadingPermissions,
    isFetching: isFetchingPermissions,
    error,
    fetchNextPage: fetchNextPermissions,
    hasNextPage: hasNextPermissions,
    refetch,
  } = useInfiniteQuery({
    queryKey: [`${type}${id}Permissions`],
    queryFn: ({ pageParam = 1 }) => {
      if (type === 'employee')
        return fetchEmployeePermissions(id, pageParam, paginationPageLimit);
      if (type === 'role')
        return fetchRolePermissions(id, pageParam, paginationPageLimit);
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  let permissions = permissionsData?.pages?.flat() || []; // Flatten the pages to get all permissions in one array

  const errorText = getErrorText(
    t,
    `permissions.errors.${error?.message}`,
    `permissions.errors.PERMISSIONS_LOAD_ERROR`,
  );

  if (!full) {
    permissions = permissions.slice(0, paginationPageLimit);
  }

  return (
    <DataFetching
      data={permissionsData}
      emptyError={t('permissions.errors.PERMISSIONS_ZERO_ERROR')}
      error={error && errorText}
      refetch={refetch}
      isLoading={isLoadingPermissions}>
      <div className="rounded-[16px] overflow-x-auto border-[1px] border-solid border-black">
        <table className="permissionsTable">
          <tbody>
            {permissions.map((item) => {
              console.log(item);
              return (
                <PermissionItem
                  item={item}
                  id={id}
                  type={type}
                  key={`${item.id}${item.type}`}
                />
              );
            })}
          </tbody>
        </table>
        {full && (
          <ShowMore
            hasNext={hasNextPermissions}
            isFetching={isFetchingPermissions}
            onClick={fetchNextPermissions}
          />
        )}
      </div>
    </DataFetching>
  );
};

export default Permissions;

