'uaw client';
import React from 'react';
import ErrorBoundary from './error-boundary';
import { useTranslations } from 'next-intl';

const ErrorBoundaryWrapper = ({ children }) => {
  const t = useTranslations();

  return (
    <ErrorBoundary fallbackText={t('errors.somethingWrong')}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;

