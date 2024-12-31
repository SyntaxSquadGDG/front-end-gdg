import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'nextjs-toploader/app';
import { useTranslations } from 'next-intl';
import { DeleteManager } from '../data/deletes'; // Adjust import path
import { useModal } from '@app/_contexts/modal-provider';

const useManagerTableItem = (manager) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations();
  const { closeModal, openModal } = useModal();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(null);

  async function handleDelete() {
    await DeleteManager(
      manager.id,
      setIsDeleting,
      setErrorDeleting,
      onDeleteSuccess,
    );
  }

  async function onDeleteSuccess() {
    closeModal();
    queryClient.invalidateQueries(['managers']);
  }

  return {
    isOpen,
    isDeleting,
    errorDeleting,
    openModal,
    closeModal,
    handleDelete,
    setIsOpen,
    router,
    t, // Return translations if needed
  };
};

export default useManagerTableItem;

