'use client';
import React from 'react';
import { useView } from '@app/_contexts/view-provider';

const StructureView = ({ children }) => {
  const { view } = useView();

  return (
    <>
      {Array.isArray(children) && (
        <>
          <div style={{ display: view === 'list' && 'none' }}>
            {children[0]} {/* Grid view */}
          </div>
          <div style={{ display: view === 'grid' && 'none' }}>
            {children[1]} {/* Table view */}
          </div>
        </>
      )}
      {!Array.isArray(children) && children}
    </>
  );
};

export default StructureView;

