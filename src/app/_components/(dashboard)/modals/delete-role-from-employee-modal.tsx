import React, { useState } from 'react';
import Modal from './modal';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import Button from '../general/button';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const DeleteRoleFromEmployeeModal = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { modalStack, closeModal, openModal } = useModal();
  const path = usePathname();
  const t = useTranslations();

  // async function handleDelete() {
  //   try {
  //     setIsDeleting(true);
  //     const res = await fetch(
  //       `http://syntaxsquad.runasp.net/api/Folders/deletefolderbyid?id=${id}`,
  //       {
  //         method: 'DELETE',
  //       },
  //     );
  //     if (!res.ok) {
  //       throw new Error('error');
  //     }
  //     console.log(res);
  //     closeModal();
  //     toast.success('Deleted Successfully');
  //     await revalidatePathAction(path);
  //   } catch (e) {
  //     toast.error('Error while deleting section');
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // }

  async function handleDelete() {}

  return (
    <Modal
      isOpen={modalStack.includes(`deleteRoleFromEmployee${id}`)}
      onClose={closeModal}
      className={contentFont.className}>
      <div className="flex flex-col gap-[16px] text-center items-center">
        <p className="text-[20px] font-medium">
          {t('roles.removeRoleFromEmployeeText')}
        </p>
        <div className="flex items-center gap-[32px]">
          <Button
            onClick={() => closeModal()}
            text={t('general.cancel')}
            variant="solid"
          />
          <Button
            onClick={() => console.log('HELLO')}
            text={t('general.delete')}
            disabled={isDeleting}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteRoleFromEmployeeModal;

