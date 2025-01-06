'use client';

import { decodeJWT } from '@app/_utils/auth';
import { getCookie } from 'cookies-next';
import HomeSVG from '../../svgs/navbars/home';
import SectionsSVG from '../../svgs/navbars/sections';
import { useTranslations } from 'use-intl';
import EmployeesSVG from '../../svgs/navbars/employees';
import RolesSVG from '../../svgs/navbars/roles';
import ActivitySVG from '../../svgs/navbars/activity';
import PlansSVG from '../../svgs/navbars/plans';
import ProfileSVG from '../../svgs/navbars/profile';

const useNavbar = () => {
  const token = getCookie('token');
  console.log(token);
  const decodedToken = token ? decodeJWT(token) : null;
  const userRole = decodedToken ? decodedToken.payload.role : null;
  const t = useTranslations();

  const ownerData = [
    {
      path: '/dashboard',
      text: t('navbar.home'),
      svg: HomeSVG,
    },
    {
      path: '/sections',
      text: t('navbar.sections'),
      svg: SectionsSVG,
    },
    {
      path: '/managers',
      text: t('navbar.managers'),
      svg: EmployeesSVG,
    },
    {
      path: '/employees',
      text: t('navbar.employees'),
      svg: EmployeesSVG,
    },
    {
      path: '/roles',
      text: t('navbar.roles'),
      svg: RolesSVG,
    },
    {
      path: '/activities',
      text: t('navbar.activity'),
      svg: ActivitySVG,
    },
    {
      path: '/plans',
      text: t('navbar.plans'),
      svg: PlansSVG,
    },
    {
      path: '/profile',
      text: t('navbar.profile'),
      svg: ProfileSVG,
    },
  ];

  const managerData = [
    {
      path: '/dashboard',
      text: t('navbar.home'),
      svg: HomeSVG,
    },
    {
      path: '/sections',
      text: t('navbar.sections'),
      svg: SectionsSVG,
    },
    {
      path: '/employees',
      text: t('navbar.employees'),
      svg: EmployeesSVG,
    },
    {
      path: '/roles',
      text: t('navbar.roles'),
      svg: RolesSVG,
    },
    {
      path: '/activities',
      text: t('navbar.activity'),
      svg: ActivitySVG,
    },
    {
      path: '/plans',
      text: t('navbar.plans'),
      svg: PlansSVG,
    },
    {
      path: '/profile',
      text: t('navbar.profile'),
      svg: ProfileSVG,
    },
  ];

  const employeeData = [
    {
      path: '/dashboard',
      text: t('navbar.home'),
      svg: HomeSVG,
    },
    {
      path: '/sections',
      text: t('navbar.sections'),
      svg: SectionsSVG,
    },
    {
      path: '/folders',
      text: t('navbar.folders'),
      svg: SectionsSVG,
    },
    {
      path: '/files',
      text: t('navbar.files'),
      svg: SectionsSVG,
    },
    {
      path: '/roles',
      text: t('navbar.roles'),
      svg: RolesSVG,
    },
    {
      path: '/profile',
      text: t('navbar.profile'),
      svg: ProfileSVG,
    },
  ];

  if (userRole === 'owner') {
    return ownerData;
  }
  if (userRole === 'manager') {
    return managerData;
  }
  if (userRole === 'employee') {
    return employeeData;
  }

  return [];
};

export default useNavbar;

