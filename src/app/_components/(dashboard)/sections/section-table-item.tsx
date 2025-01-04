'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import StackUsers from '../general/stack';
import SectionSettings from './section-settings';
import DocumentsSVG from '@app/_components/svgs/guest/documents';
import SettingsSVG from '@app/_components/svgs/general/settings';

const SectionTableItem = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <tr key={section.id}>
      <td>
        <Link href={`/sections/${section.id}`}>{section.name}</Link>
      </td>
      <td>{section.numberOfFolders}</td>
      <td>{section.lastModified}</td>
      <td>{section.size}</td>
      <td>
        <div className="flex w-[100%] h-[100%] items-center justify-center">
          <StackUsers employeesCount={section.numberOfEmployees} />
        </div>
      </td>
      <td>
        <SectionSettings id={section.id} />
      </td>
    </tr>
  );
};

export default SectionTableItem;

