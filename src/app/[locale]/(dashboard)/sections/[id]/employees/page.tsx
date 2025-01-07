import DeleteSVG from '@/app/_components/svgs/permissions/delete';
import { contentFont } from '@/app/_utils/fonts';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadErrorDiv from '@app/_components/(dashboard)/general/load-error-div';
import RefetchWrapper from '@app/_components/(dashboard)/general/refetch-wrapper';
import { fetchSectionName } from '@app/_components/(dashboard)/sections/data/queires';
import EmployeesTable from '@app/_components/(dashboard)/sections/employees-table';
import { getErrorText } from '@app/_utils/translations';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async ({ params }) => {
  const t = await getTranslations();
  const id = (await params).id;

  const SectionDataWrapper = async () => {
    let items;
    try {
      const sectionName = await fetchSectionName(id);
      const items = [
        { text: sectionName, href: `/sections/${id}` },
        { text: t('employees.employees'), href: `/sections/${id}/employees` },
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

  return (
    <div className={clsx(contentFont.className)}>
      <SectionDataWrapper />
      <EmployeesTable id={id} full={true} />
    </div>
  );
};

export default page;

