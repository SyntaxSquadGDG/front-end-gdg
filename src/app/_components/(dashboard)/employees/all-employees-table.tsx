'use client';

import React from 'react';
import EmployeesTable from './employees-table';
import { fetchEmployeesClient } from '@app/_utils/fetch/queries';

const AllEmployeesTable = () => {
  return (
    <div>
      <EmployeesTable
        fetchFunction={fetchEmployeesClient}
        tags={['employees']}
      />
    </div>
  );
};

export default AllEmployeesTable;

