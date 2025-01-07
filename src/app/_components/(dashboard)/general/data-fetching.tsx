'use client';
import React from 'react';
import LoadingSpinner from './loader';
import ErrorBoundaryWrapper from './error-boundary-wrapper';
import LoadError from './load-error';
import RefetchButton from './refetch';
import LoadErrorDiv from './load-error-div';

const DataFetching = ({
  isLoading,
  data,
  children,
  error,
  emptyError,
  refetch,
  className,
}) => {
  if (error && ((data && data?.length === 0) || !data)) {
    return (
      <LoadErrorDiv>
        <LoadError className={className}>{error}</LoadError>
        <RefetchButton refetch={refetch} />
      </LoadErrorDiv>
    );
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

