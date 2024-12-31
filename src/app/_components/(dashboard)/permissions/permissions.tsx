'use client';
import FileItemPermissionSVG from '@app/_components/svgs/files/file-item-permission';
import FolderItemPermissionSVG from '@app/_components/svgs/folders/folder-item-permission';
import AddSVG from '@app/_components/svgs/general/add';
import DeleteSVG from '@app/_components/svgs/permissions/delete';
import SectionItemPermissionSVG from '@app/_components/svgs/sections/section-item-permission';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import PermissionItem from './permission-item';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  fetchEmployeePermissions,
  fetchTypePermissions,
} from '@app/_utils/fetch/queries';
import LoadingSpinner from '../general/loader';
import NoToShow from '../general/no-to-show';
import TryLater from '../general/try-later';
import ShowMore from '../general/show-more';

const Permissions = ({ id, type, full = false }) => {
  const t = useTranslations();

  const {
    data: permissionsData,
    isLoading: isLoadingPermissions,
    isFetching: isFetchingPermissions,
    isError: isPermissionsError,
    fetchNextPage: fetchNextPermissions,
    hasNextPage: hasNextPermissions,
  } = useInfiniteQuery({
    queryKey: [`${type}Permissions`],
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam = 1 }) => {
      return fetchTypePermissions(pageParam, 5, type, id); // Return initial data if provided
    },
    getNextPageParam: (lastPage, pages) => {
      const hasData = lastPage.length > 0;

      const isLastPage = !hasData || lastPage.length < 5; // Adjust length based on how many items are expected per page

      return hasData && !isLastPage ? pages.length + 1 : undefined;
    },
  });

  let permissions = permissionsData?.pages?.flat() || []; // Flatten the pages to get all permissions in one array

  if (!full) {
    permissions = permissions.slice(0, 5);
  }

  if (isLoadingPermissions) {
    return <LoadingSpinner full={false} />;
  }

  if (isPermissionsError) {
    return <TryLater>{t('zero.permissions')}</TryLater>;
  }

  if (permissions.length === 0) {
    return <NoToShow>{t('zero.permissions')}</NoToShow>;
  }

  return (
    <div className="rounded-[16px] overflow-x-auto border-[1px] border-solid border-black">
      <table className="permissionsTable">
        <tbody>
          {permissions.map((item) => {
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
  );
};

export default Permissions;

