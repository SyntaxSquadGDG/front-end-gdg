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

const EditPathModal = ({
  setSelectedPath,
  setSelectedItem,
  setIsPathChanged,
  onPathChange,
  id,
}) => {
  const { modalStack, closeModal } = useModal();
  // const [localSelectedPath, setLocalSelectedPath] = useState(null);
  const t = useTranslations();
  const isOpen = modalStack.includes(`moveFileWithAI${id}`);
  const [localSelectedItem, setLocalSelectedItem] = useState({
    type: null,
    id: null,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['availableStructure', id], // Unique key for the query
    queryFn: fetchAvailableStructure, // Function to fetch the data
    enabled: isOpen, // Set to false if you want to fetch on user action (e.g., button click)
  });

  function handleClose() {
    closeModal();
    setLocalSelectedItem({ type: null, id: null });
    // setLocalSelectedPath(null);
  }

  function handlePathChanged() {
    setIsPathChanged(true);
    // setSelectedPath(localSelectedPath);
    setSelectedItem(localSelectedItem);
    // setLocalSelectedPath(null);
    onPathChange(localSelectedItem.id);
    closeModal();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      innerClassName="w-[800px]"
      className={'font-content'}>
      <h2 className="text-20px font-medium text-mainColor1 mb-32px">
        Edit File Path
      </h2>

      <DataFetching
        data={data}
        isLoading={isLoading}
        isError={isError}
        item="Structure">
        <HierarchicalView
          setSelectedPath={setSelectedPath}
          data={data}
          selectedItem={localSelectedItem}
          setSelectedItem={setLocalSelectedItem}
        />
      </DataFetching>

      <Button
        disabled={
          localSelectedItem.id === null || localSelectedItem.type === null
        }
        text={'Confirm'}
        onClick={handlePathChanged}
        className={'w-[100%] mt-32px'}
      />
    </Modal>
  );
};

export default EditPathModal;

