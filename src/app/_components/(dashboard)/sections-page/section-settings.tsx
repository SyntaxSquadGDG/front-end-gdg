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

const SectionSettings = ({ section }) => {
  const t = useTranslations();
  const { modalStack, openModal, closeModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const res = await fetch(
        `http://syntaxsquad.runasp.net/api/Sections/deletesection?id=${section.id}`,
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
      await revalidatePathAction('/sections');
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

      <ItemModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalName={`deleteModal${section.id}`}>
        <ItemModalItem
          SVG={EditPermissionsSVG}
          text={t('modals.editPermissions')}
          type="button"
          onClick={() => {
            openModal(`ItemPermissionsEdit${'section'}${section.id}`);
            setIsOpen(false);
          }}
        />
        <ItemModalItem
          SVG={PermittedEmployeesSVG}
          text={t('modals.permittedEmployees')}
          type="link"
          href={`/sections/${section.id}/employees`}
        />

        <ItemModalItem
          SVG={EditSVG}
          text={t('modals.rename')}
          onClick={() => {
            openModal(`renameSectionModal${section.id}`);
            setIsOpen(false);
          }}
          type="button"
        />

        <ItemModalItem
          SVG={RemoveSVG}
          text={t('general.delete')}
          onClick={() => {
            openModal(`deleteSectionModal${section.id}`);
            setIsOpen(false);
          }}
          type="button"
        />
      </ItemModal>
      <DeleteModal
        head={t('sections.deleteDescription')}
        modalName={`deleteSectionModal${section.id}`}
        onClick={() => {
          handleDelete();
          setIsOpen(false);
        }}
        isDeleting={isDeleting}
      />
      <RenameModal
        head={t('modals.rename')}
        modalName={`renameSectionModal${section.id}`}
        isRenaming={isRenaming}
        onClick={(data) => {
          console.log(data);
          setIsOpen(false);
        }}
      />
      <ItemPermissionsEditModal type={'section'} id={section.id} />
    </div>
  );
};

export default SectionSettings;

