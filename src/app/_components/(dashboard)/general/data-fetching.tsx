'use client';
import React from 'react';
import LoadingSpinner from './loader';
import ErrorBoundaryWrapper from './error-boundary-wrapper';
import LoadError from './load-error';

const DataFetching = ({ isLoading, data, children, error, emptyError }) => {
  if (error) {
    return <LoadError>{error}</LoadError>;
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if ((!data || data.length === 0) && emptyError) {
    return <LoadError>{emptyError}</LoadError>;
  }

  return <ErrorBoundaryWrapper>{children}</ErrorBoundaryWrapper>;
};

export default DataFetching;

