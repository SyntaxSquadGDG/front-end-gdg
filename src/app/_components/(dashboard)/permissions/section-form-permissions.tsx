'use client';
import React, { useState } from 'react';
import Checkbox from '../general/checkbox';
import PermissionsHeadText from './permissions-head-text';
import { useTranslations } from 'next-intl';
import Button from '../general/button';
import PermissionsDiv from './permissions-div';

const SectionFormPermissions = ({ type, id, defaultPermissions }) => {
  const [permissions, setPermissions] = useState(defaultPermissions || []); // Stores selected permissions
  const t = useTranslations();
  const disabledCondition = permissions.length === 0;

  const handleToggle = (index) => {
    setPermissions((prev) => {
      if (prev.includes(index)) {
        // If unchecked, remove the permission and all permissions after it
        return prev.filter((perm) => perm < index);
      } else {
        // If checked, add it if the previous permissions are selected
        if (prev.includes(index - 1) || index === 0) {
          return [...prev, index].sort((a, b) => a - b);
        } else {
          alert(`You must enable permission ${index - 1} first.`);
          return prev;
        }
      }
    });
  };

  return (
    <div>
      <div className="">
        <PermissionsHeadText>
          {t('permissions.sectionPermissions')}
        </PermissionsHeadText>
        <PermissionsDiv>
          {Array.from({ length: 5 }).map((_, index) => (
            <Checkbox
              key={index}
              value={permissions.includes(index)}
              disabled={index > 0 && !permissions.includes(index - 1)}
              onChange={() => handleToggle(index)}
              label={`Permission ${index}`}
            />
          ))}
        </PermissionsDiv>
      </div>
      <Button
        text={t('permissions.updateButton')}
        disabled={disabledCondition || id.length === 0}
        className={'mt-[32px] w-[100%]'}
        onClick={() => {
          console.log(id);
          console.log(permissions);
        }}
      />
    </div>
  );
};

export default SectionFormPermissions;

