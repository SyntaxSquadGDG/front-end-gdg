'use client';

import SettingsSVG from '@app/_components/svgs/general/settings';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
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
import DataFetching from '../general/data-fetching';
import { getErrorText } from '@app/_utils/translations';

const SectionSettings = ({ id }) => {
  const t = useTranslations();
  const { modalStack, openModal, closeModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [errorText, setErrorText] = useState(null);

  function handleSettingsClick() {
    setIsOpen(true);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['sectionSettings', id], // Unique key for the query
    queryFn: () => fetchSectionSettings(id), // Function to fetch the data
    enabled: isOpen, // Set to false if you want to fetch on user action (e.g., button click)
  });

  useEffect(() => {
    const errorText = getErrorText(
      t,
      `sections.errors.${error?.message}`,
      `sections.errors.SECTION_SETTINGS_FETCH_ERROR`,
    );
    setErrorText(errorText);
  }, [error]);

  return (
    <div className="relative">
      <button onClick={handleSettingsClick}>
        <SettingsSVG />
      </button>

      <ItemModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <DataFetching
          isLoading={isLoading}
          error={error && errorText}
          data={data}
          emptyError={t('sections.settings.SECTION_SETTINGS_ZERO_ERROR')}>
          <React.Fragment>
            <ItemModalItem
              SVG={EditPermissionsSVG}
              text={t('modals.editPermissions')}
              type="button"
              onClick={() => {
                openModal(`ItemPermissionsEdit${'section'}${id}`);
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
              }}
              type="button"
            />

            <ItemModalItem
              SVG={RemoveSVG}
              text={t('general.delete')}
              onClick={() => {
                openModal(`deleteSectionModal${id}`);
              }}
              type="button"
            />
          </React.Fragment>
        </DataFetching>
      </ItemModal>
    </div>
  );
};

export default SectionSettings;

