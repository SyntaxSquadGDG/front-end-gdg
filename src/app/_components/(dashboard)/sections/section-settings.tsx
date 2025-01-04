'use client';

import SettingsSVG from '@app/_components/svgs/general/settings';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import ItemModal from '../modals/item-modal';
import RemoveSVG from '@app/_components/svgs/modals/remove';
import { useModal } from '@app/_contexts/modal-provider';
import ItemModalItem from '../modals/item-modal-item';
import EditSVG from '@app/_components/svgs/modals/edit';
import PermittedEmployeesSVG from '@app/_components/svgs/modals/permitted-employees';
import EditPermissionsSVG from '@app/_components/svgs/modals/edit-permissions';
import RenameModal from '../modals/rename-modal';
import DeleteModal from '../modals/delete-modal';
import ItemPermissionsEditModal from '../modals/item-permissions-edit-modal';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@app/actions';
import DocumentsSVG from '@app/_components/svgs/guest/documents';
import { fetchSectionSettings } from './data/queires';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../general/loader';

const SectionSettings = ({ id }) => {
  const t = useTranslations();
  const { modalStack, openModal, closeModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isOpenedBefore, setIsOpenedBefore] = useState(false);

  function handleSettingsClick() {
    setIsOpen(true);
    if (!isOpenedBefore) {
      setIsOpenedBefore(true);
      refetch(); // Fetch only when settings is opened for the first time
    }
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['sectionSettings', id], // Unique key for the query
    queryFn: () => fetchSectionSettings(id, isLoading, setError, t, toast), // Function to fetch the data
    enabled: false, // Set to false if you want to fetch on user action (e.g., button click)
  });

  return (
    <div className="relative">
      <button onClick={handleSettingsClick}>
        <SettingsSVG />
      </button>

      <ItemModal isOpen={isOpen} setIsOpen={setIsOpen}>
        {isLoading && <LoadingSpinner />}
        {error && error}
        {!isLoading && !error && (
          <React.Fragment>
            <ItemModalItem
              SVG={EditPermissionsSVG}
              text={t('modals.editPermissions')}
              type="button"
              onClick={() => {
                openModal(`ItemPermissionsEdit${'section'}${id}`);
                setIsOpen(false);
              }}
            />
            <ItemModalItem
              SVG={PermittedEmployeesSVG}
              text={t('modals.permittedEmployees')}
              type="link"
              href={`/sections/${id}/employees`}
            />

            <ItemModalItem
              SVG={EditSVG}
              text={t('modals.rename')}
              onClick={() => {
                openModal(`renameSectionModal${id}`);
                setIsOpen(false);
              }}
              type="button"
            />

            <ItemModalItem
              SVG={RemoveSVG}
              text={t('general.delete')}
              onClick={() => {
                openModal(`deleteSectionModal${id}`);
                setIsOpen(false);
              }}
              type="button"
            />
          </React.Fragment>
        )}
      </ItemModal>
    </div>
  );
};

export default SectionSettings;

