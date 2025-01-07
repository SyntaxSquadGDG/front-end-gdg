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
import { fetchEmployee } from '@app/_components/(dashboard)/employees/data/queries';
import { fetchSectionName } from '@app/_components/(dashboard)/sections/data/queires';
import Activity from '@app/_components/(dashboard)/sections/activity';

const page = async ({ params }) => {
  const id = (await params).id;

  const SectionDataWrapper = async () => {
    let items;
    try {
      const sectionName = await fetchSectionName(id);
      const items = [
        { text: sectionName, href: `/sections/${id}` },
        { text: t('activity.activity'), href: `/sections/${id}/activities` },
      ];
      return (
        <>
          <HeadBar items={items}></HeadBar>
        </>
      );
    } catch (error) {
      const errorText = getErrorText(
        t,
        `sections.errors.${error?.message}`,
        `sections.errors.SECTION_PATH_ERROR`,
      );
      return (
        <LoadErrorDiv>
          <LoadError>{errorText}</LoadError>
          <RefetchWrapper tag={`section${id}`} />
        </LoadErrorDiv>
      );
    }
  };

  const t = await getTranslations();

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <SectionDataWrapper />
      </Suspense>
      <Activity type={'employee'} id={id} full={true} />
    </div>
  );
};

export default page;

