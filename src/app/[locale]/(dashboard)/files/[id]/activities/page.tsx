import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import Permissions from '@app/_components/(dashboard)/permissions/permissions';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import EmployeesSVG from '@app/_components/svgs/navbars/employees';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import LoadErrorDiv from '@app/_components/(dashboard)/general/load-error-div';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import RefetchWrapper from '@app/_components/(dashboard)/general/refetch-wrapper';
import { getErrorText } from '@app/_utils/translations';
import Activity from '@app/_components/(dashboard)/sections/activity';
import { fetchFolderPath } from '@app/_components/(dashboard)/folders/data/queries';
import { fetchFilePath } from '@app/_components/(dashboard)/files/data/queries';

const page = async ({ params }) => {
  const id = (await params).id;

  const FileDataWrapper = async () => {
    let items;
    try {
      const path = await fetchFilePath(id);
      console.log(path);
      const items = [
        { text: path.slice(-1)[0].name, href: `/files/${id}` },
        { text: t('activity.activity'), href: `/files/${id}/activities` },
      ];
      return (
        <>
          <HeadBar items={items}></HeadBar>
        </>
      );
    } catch (error) {
      const errorText = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILE_PATH_ERROR`,
      );
      return (
        <LoadErrorDiv>
          <LoadError>{errorText}</LoadError>
          <RefetchWrapper tag={`file${id}`} />
        </LoadErrorDiv>
      );
    }
  };

  const t = await getTranslations();

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <FileDataWrapper />
      </Suspense>
      <Activity type={'employee'} id={id} full={true} />
    </div>
  );
};

export default page;

