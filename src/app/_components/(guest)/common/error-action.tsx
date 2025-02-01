'use client';

import React from 'react';

const ErrorAction = ({ children }) => {
  return (
    <>
      {children && (
        <p className="text-errorColor font-bold text-16px">* {children}</p>
      )}
    </>
  );
};

export default ErrorAction;

