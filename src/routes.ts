export const locales = ['en', 'ar'];
export const defaultLocale = 'en';

export const publicRoutes = ['/public'];

export const owner = [
  '/managers',
  '/managers/new',
  '/managers/:id',
  '/managers/:id/edit',
  '/managers/:id/activity',
];

const managerOwner = [
  '/employees',
  '/employees/new',
  '/employees/:id',
  '/employees/:id/edit',
  '/employees/:id/permissions',
  '/employees/:id/roles',
  '/employees/:id/activity',
  '/roles',
  '/roles/new',
  '/roles/:id',
  '/roles/:id/edit',
  '/roles/:id/permissions',
  '/roles/:id/employees',
  '/plans',
  '/activities',
];

const employeeManagerOwner = [
  '/dashboard',
  '/sections',
  '/sections/:id',
  '/sections/:id/employees',
  '/folders/:id',
  '/files/:id',
  '/files/:id/preview',
  '/profile',
  '/search',
  '/help',
  '/notifications',
  // '/preview',
  // '/test',
];

export const employeeRoutes = ['/files', '/folders', ...employeeManagerOwner];
export const managerRoutes = [...managerOwner, ...employeeManagerOwner];
export const ownerRoutes = [...owner, ...managerOwner, ...employeeManagerOwner];

export const guestRoutes = [
  '/',
  '/about',
  '/services',
  '/solutions',
  '/pricing',
  '/contact',
  '/login',
  '/register',
  '/forget-password',
  '/new-password',
  '/demo',
  '/tour',
];

