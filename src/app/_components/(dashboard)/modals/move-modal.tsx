import React, { useState } from 'react';
import Modal from './modal';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import HierarchicalView from '../general/hierarchy';
import Button from '../general/button';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { fetchAvailableStructure } from '@app/_utils/fetch/queries';
import DataFetching from '../general/data-fetching';

const MoveModal = ({ move, type, id, itemName }) => {
  const { modalStack, closeModal } = useModal();
  const [selectedItem, setSelectedItem] = useState({ type: null, id: null });
  const t = useTranslations();
  const name = `${move ? 'move' : 'copy'}${type}${id}`;
  const isOpen = modalStack.includes(name);

  function handleMove() {}

  function handleCopy() {}

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['availableStructure', id], // Unique key for the query
    queryFn: fetchAvailableStructure, // Function to fetch the data
    enabled: isOpen, // Set to false if you want to fetch on user action (e.g., button click)
  });

  function handleClose() {
    closeModal();
    setSelectedItem({ type: null, id: null });
  }

  return (
    <Modal
      isOpen={modalStack.includes(name)}
      onClose={handleClose}
      innerClassName="w-[800px]"
      className={contentFont.className}>
      <h2 className="text-[20px] font-medium text-mainColor1 mb-[32px]">
        {move ? t('general.move') : t('general.copy')} {itemName}{' '}
        {t('general.to')}
      </h2>

      <DataFetching
        data={data}
        isLoading={isLoading}
        isError={isError}
        item="Structure">
        <HierarchicalView
          data={data}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </DataFetching>

      <Button
        disabled={selectedItem.id === null || selectedItem.type === null}
        text={move ? t('modals.moveButton') : t('modals.copyButton')}
        onClick={move ? handleMove() : handleCopy()}
        className={'w-[100%] mt-[32px]'}
      />
    </Modal>
  );
};

export default MoveModal;

