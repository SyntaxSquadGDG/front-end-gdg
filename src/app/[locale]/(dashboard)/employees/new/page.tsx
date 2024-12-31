import NewEmployee from '@app/_components/(dashboard)/employees/new-employee';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import Input from '@app/_components/(dashboard)/general/input';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [
    { text: t('employees.employees'), href: '/employees' },
    { text: t('employees.add'), href: '/employees/new' },
  ];

  const fetchRoles = async () => {
    const rolesReq = await fetch(`${process.env.BASE_URL}/roles`, {
      next: {
        revalidate: 0,
        tags: ['roles'],
      },
    });
    return rolesReq.json();
  };

  const NewEmployeeWrapper = async () => {
    try {
      const roles = await fetchRoles();
      return <NewEmployee initialRoles={roles} />;
    } catch (error) {
      console.error('Error fetching employees:', error);
      return <NewEmployee initialRoles={null} />;
    }
  };

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG} />
      {/* <Suspense fallback={<LoadingSpinner />}>
        <NewEmployeeWrapper />
      </Suspense> */}
      <NewEmployee />
    </div>
  );
};

export default page;

