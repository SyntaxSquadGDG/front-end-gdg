export const handleRowClick = (router, manager, e) => {
  // Prevent navigation if a button or link was clicked
  if (e.target.tagName === 'BUTTON' || e.target.closest('a, button')) {
    return;
  }
  router.push(`/managers/${manager.id}`);
};

