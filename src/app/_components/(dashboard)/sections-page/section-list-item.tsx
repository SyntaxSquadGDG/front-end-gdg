'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import StackUsers from '../general/stack';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import ItemModal from '../modals/item-modal';
import DeleteSectionModal from '../modals/delete-section-modal';
import SectionSettings from './section-settings';

const SectionListItem = ({ section }) => {
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
        <SectionSettings section={section} />
      </td>
    </tr>
  );
};

export default SectionListItem;

