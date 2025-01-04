'use client';
import React from 'react';
import LoadingSpinner from './loader';
import NoToShow from './no-to-show';
import TryLater from './try-later';
import { useTranslations } from 'next-intl';
import ErrorBoundaryWrapper from './error-boundary-wrapper';

const DataFetching = ({
  isLoading,
  data,
  isError,
  children,
  skipEmpty = false,
  item = 'Manager',
}) => {
  const t = useTranslations();
  if (isError) {
    return <TryLater>{item}</TryLater>;
  }
  if (isLoading) {
    return <LoadingSpinner full={false} />;
  }

  if ((!data || data.length === 0) && !skipEmpty) {
    return <NoToShow>{item}</NoToShow>;
  }

  return <ErrorBoundaryWrapper>{children}</ErrorBoundaryWrapper>;
};

export default DataFetching;

