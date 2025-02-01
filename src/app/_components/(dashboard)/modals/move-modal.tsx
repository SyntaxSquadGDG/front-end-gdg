import React, { useEffect, useState } from 'react';
import Modal from './modal';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import HierarchicalView from '../general/hierarchy';
import Button from '../general/button';
import { useTranslations } from 'next-intl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAvailableStructure } from '@app/_utils/fetch/queries';
import DataFetching from '../general/data-fetching';
import { fetchFileMoveAvailableStructure } from '../files/data/queries';
import { getErrorText } from '@app/_utils/translations';
import { copyFileToFolder, moveFileToFolder } from '../files/data/posts';
import {
  copyFolderToFolder,
  copyFolderToSection,
  moveFolderToFolder,
  moveFolderToSection,
} from '../folders/data/posts';
import toast from 'react-hot-toast';
import { fetchFolderMoveAvailableStructure } from '../folders/data/queries';

const MoveModal = ({ move, type, id, itemName }) => {
  const { modalStack, closeModal } = useModal();
  const [selectedItem, setSelectedItem] = useState({ type: null, id: null });
  const t = useTranslations();
  const name = `${move ? 'move' : 'copy'}${type}${id}`;
  const isOpen = modalStack.includes(name);
  const [errorTextMutation, setErrorTextMutation] = useState(null);

  const queryClient = useQueryClient();
  let queryFn;
  let mutateFn;

  switch (type) {
    case 'file':
      queryFn = fetchFileMoveAvailableStructure;
      break;
    case 'folder':
      queryFn = fetchFolderMoveAvailableStructure;
      break;
    default:
      queryFn = fetchFileMoveAvailableStructure;
      break;
  }

  async function handleMove() {
    if (type === 'file') {
      return await moveFileToFolder(id, selectedItem.id);
    } else if (type === 'folder') {
      if (selectedItem.type === 'folder') {
        return await moveFolderToFolder(id, selectedItem.id);
      } else if (selectedItem.type === 'section') {
        return await moveFolderToSection(id, selectedItem.id);
      }
    }
  }

  async function handleCopy() {
    if (type === 'file') {
      return await copyFileToFolder(id, selectedItem.id);
    } else if (type === 'folder') {
      if (selectedItem.type === 'folder') {
        return await copyFolderToFolder(id, selectedItem.id);
      } else if (selectedItem.type === 'section') {
        return await copyFolderToSection(id, selectedItem.id);
      }
    }
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['availableStructure', type, id], // Unique key for the query
    queryFn: () => queryFn(id), // Function to fetch the data
    enabled: isOpen, // Set to false if you want to fetch on user action (e.g., button click)
  });

  const mutation = useMutation({
    mutationFn: () => (move ? handleMove() : handleCopy()),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        `${type}s`,
        id,
        `${selectedItem.type}s`,
        selectedItem.id,
      ]);
      handleClose();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `structure.errors.${error?.message}`,
        move ? 'structure.errors.MOVE_ERROR' : 'structure.errors.COPY_ERROR',
      );
      setErrorTextMutation(textError);
      toast.error(textError);
    },
  });

  const textError = getErrorText(
    t,
    `structure.errors.${error?.message}`,
    `structure.errors.STRUCTURE_LOAD_ERROR`,
  );

  function handleClose() {
    closeModal();
    setSelectedItem({ type: null, id: null });
  }

  function onSubmit() {
    setErrorTextMutation(null);
    mutation.mutate();
  }

  return (
    <Modal
      isOpen={modalStack.includes(name)}
      onClose={handleClose}
      innerClassName="w-[800px]"
      className={'font-content'}>
      <h2 className="text-20px font-medium text-mainColor1 mb-32px">
        {move ? t('general.move') : t('general.copy')} {itemName}
        {t('general.to')}
      </h2>

      <DataFetching
        data={data}
        isLoading={isLoading}
        error={error && textError}
        refetch={refetch}
        emptyError={t('structure.errors.STRUCTURE_ZERO_ERROR')}>
        <HierarchicalView
          data={data}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </DataFetching>

      <Button
        disabled={selectedItem.id === null || selectedItem.type === null}
        text={move ? t('modals.moveButton') : t('modals.copyButton')}
        onClick={onSubmit}
        className={'w-[100%] mt-32px'}
      />
    </Modal>
  );
};

export default MoveModal;

