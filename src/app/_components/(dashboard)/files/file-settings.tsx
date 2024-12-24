'use client';

import React, { useState } from 'react';
import ItemPermissionsEditModal from '../modals/item-permissions-edit-modal';
import MoveModal from '../modals/move-modal';
import RenameModal from '../modals/rename-modal';
import DeleteModal from '../modals/delete-modal';
import ItemModalItem from '../modals/item-modal-item';
import ItemModal from '../modals/item-modal';
import SettingsSVG from '@app/_components/svgs/general/settings';
import EditPermissionsSVG from '@app/_components/svgs/modals/edit-permissions';
import EditSVG from '@app/_components/svgs/modals/edit';
import { useModal } from '@app/_contexts/modal-provider';
import { useTranslations } from 'next-intl';
import ShowVersionSVG from '@app/_components/svgs/modals/show-version';
import UpdateSVG from '@app/_components/svgs/modals/update';
import MetadataSVG from '@app/_components/svgs/modals/metadata';
import MoveSVG from '@app/_components/svgs/modals/move';
import CopySVG from '@app/_components/svgs/modals/copy';
import RemoveSVG from '@app/_components/svgs/modals/remove';

const FileSettings = ({ file }) => {
  const { modalStack, openModal } = useModal();
  const t = useTranslations();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function handleDelete() {
    try {
      setIsDeleting(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="relative flex justify-end">
      <button onClick={() => setIsOpen(true)}>
        <SettingsSVG />
      </button>

      <ItemModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalName={`deleteFileModal${file.id}`}>
        <ItemModalItem
          SVG={EditPermissionsSVG}
          text={t('modals.editPermissions')}
          onClick={() => openModal(`ItemPermissionsEdit${'file'}${file.id}`)}
        />
        <ItemModalItem
          SVG={EditSVG}
          text={t('modals.rename')}
          onClick={() => openModal(`renameFileModal${file.id}`)}
        />
        <ItemModalItem
          SVG={ShowVersionSVG}
          text={t('modals.showVersions')}
          onClick={() => console.log('Show versions')}
          // onClick={() => openModal(`renameFileModal${file.id}`)}
        />
        <ItemModalItem
          SVG={UpdateSVG}
          text={t('modals.update')}
          onClick={() => console.log('Update')}
          // onClick={() => openModal(`renameFileModal${file.id}`)}
        />
        <ItemModalItem
          SVG={MetadataSVG}
          text={t('modals.viewMetadata')}
          onClick={() => console.log('View Metadata')}
          // onClick={() => openModal(`renameFileModal${file.id}`)}
        />
        <ItemModalItem
          SVG={MoveSVG}
          text={t('modals.move')}
          onClick={() => openModal(`move${'file'}${file.id}`)}
        />
        <ItemModalItem
          SVG={CopySVG}
          text={t('modals.copy')}
          onClick={() => openModal(`copy${'file'}${file.id}`)}
        />
        <ItemModalItem
          SVG={RemoveSVG}
          text={t('modals.delete')}
          onClick={() => openModal(`deleteFileModal${file.id}`)}
        />
      </ItemModal>
      <DeleteModal
        head={t('files.deleteDescription')}
        isDeleting={isDeleting}
        modalName={`deleteFileModal${file.id}`}
        onClick={handleDelete}
      />
      <RenameModal
        head={t('modals.rename')}
        modalName={`renameFileModal${file.id}`}
        isRenaming={isRenaming}
        onClick={(data) => console.log(data)}
      />
      <MoveModal move={true} type={'file'} id={file.id} itemName={file.name} />
      <MoveModal move={false} type={'file'} id={file.id} itemName={file.name} />

      <ItemPermissionsEditModal type={'file'} id={file.id} />
    </div>
  );
};

export default FileSettings;

