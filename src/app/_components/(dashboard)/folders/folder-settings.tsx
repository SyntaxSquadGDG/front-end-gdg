'use client';

import React, { useState } from 'react';
import ItemPermissionsEditModal from '../modals/item-permissions-edit-modal';
import SettingsSVG from '@app/_components/svgs/general/settings';
import ItemModal from '../modals/item-modal';
import ItemModalItem from '../modals/item-modal-item';
import EditPermissionsSVG from '@app/_components/svgs/modals/edit-permissions';
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';
import EditSVG from '@app/_components/svgs/modals/edit';
import MoveSVG from '@app/_components/svgs/modals/move';
import CopySVG from '@app/_components/svgs/modals/copy';
import MetadataSVG from '@app/_components/svgs/modals/metadata';
import RemoveSVG from '@app/_components/svgs/modals/remove';
import DeleteModal from '../modals/delete-modal';
import RenameModal from '../modals/rename-modal';
import MoveModal from '../modals/move-modal';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@app/actions';
import { usePathname } from 'next/navigation';

const FolderSettings = ({ folder }) => {
  const t = useTranslations();
  const { openModal, modalStack, closeModal } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const res = await fetch(
        `http://syntaxsquad.runasp.net/api/Folders/deletefolderbyid?id=${folder.id}`,
        {
          method: 'DELETE',
        },
      );
      if (!res.ok) {
        throw new Error('error');
      }
      console.log(res);
      closeModal();
      toast.success('Deleted Successfully');
      await revalidatePathAction(path);
    } catch (e) {
      toast.error('Error while deleting section');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(true)}>
        <SettingsSVG />
      </button>

      <ItemModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <ItemModalItem
          SVG={EditPermissionsSVG}
          text={t('modals.editPermissions')}
          onClick={() =>
            openModal(`ItemPermissionsEdit${'folder'}${folder.id}`)
          }
        />
        <ItemModalItem
          SVG={EditSVG}
          text={t('modals.rename')}
          onClick={() => openModal(`renameFolderModal${folder.id}`)}
        />
        <ItemModalItem
          SVG={MoveSVG}
          text={t('modals.move')}
          onClick={() => openModal(`move${'folder'}${folder.id}`)}
        />
        <ItemModalItem
          SVG={CopySVG}
          text={t('modals.copy')}
          onClick={() => openModal(`copy${'folder'}${folder.id}`)}
        />
        <ItemModalItem
          SVG={MetadataSVG}
          text={t('modals.editMetadata')}
          onClick={() => console.log('METADATA')}
          // onClick={() => openModal(`copy${'folder'}${folder.id}`)}
        />
        <ItemModalItem
          SVG={RemoveSVG}
          text={t('modals.delete')}
          onClick={() => openModal(`deleteFolderModal${folder.id}`)}
        />
      </ItemModal>
      <DeleteModal
        head={t('folders.deleteDescription')}
        modalName={`deleteFolderModal${folder.id}`}
        isDeleting={isDeleting}
        onClick={handleDelete}
      />
      <RenameModal
        head={t('modals.rename')}
        modalName={`renameFolderModal${folder.id}`}
        isRenaming={isRenaming}
        onClick={(data) => console.log(data)}
      />
      <MoveModal
        move={true}
        type={'folder'}
        id={folder.id}
        itemName={folder.name}
      />
      <MoveModal
        move={false}
        type={'folder'}
        id={folder.id}
        itemName={folder.name}
      />

      <ItemPermissionsEditModal type={'folder'} id={folder.id} />
    </div>
  );
};

export default FolderSettings;

