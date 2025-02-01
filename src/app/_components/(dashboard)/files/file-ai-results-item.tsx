'use client';

import React, { useState } from 'react';
import AccuracyLevel from '../general/accuracy';
import FileIcon from '../general/file-icon';
import clsx from 'clsx';
import EditPathModal from '../modals/edit-path-modal';
import { useModal } from '@app/_contexts/modal-provider';
import EditSVG from '@app/_components/svgs/modals/edit';

const FileAiResultsItem = ({
  id,
  index,
  file,
  files,
  setFiles,
  metadata,
  filesData,
  setFilesData,
}) => {
  const handleClick = (file) => {
    if (file) {
      const imageURL = URL.createObjectURL(file); // Create a temporary URL for the file
      window.open(imageURL, '_blank'); // Open the image in a new tab
      // Optional: Revoke the object URL after opening to free memory
      setTimeout(() => URL.revokeObjectURL(imageURL), 1000);
    }
  };

  function handleModalClose() {
    closeModal();
    setFiles(null);
    setFilesData(null);
  }

  const handlePathChange = (newFolderId) => {
    const newFilesData = filesData;
    newFilesData[index].path = selectedPath;
    newFilesData[index].folderId = newFolderId;
    setFilesData(newFilesData);
  };

  const handleRemove = () => {
    setFilesData((prevFilesData) => {
      const newFilesData = [...prevFilesData]; // Create a new array
      newFilesData[index] = { ...newFilesData[index], path: '', folderId: -1 }; // Update a new object
      return newFilesData;
    });
  };

  const { openModal, closeModal } = useModal();

  const [isPathChanged, setIsPathChanged] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedItem, setSelectedItem] = useState({ type: null, id: null });

  if (metadata.folderId === -1) {
    return null;
  }

  return (
    <>
      <tr className="py-40px font-medium text-18px rounded-[32px]">
        <td>
          <div className="flex items-center justify-center">
            <AccuracyLevel
              isModified={isPathChanged}
              accuracy={metadata.accuracy || 0}
            />
          </div>
        </td>
        <td>
          <button onClick={() => handleClick(file)}>
            <FileIcon type={file.type} />
          </button>
        </td>
        <td>{file.name}</td>
        <td
          className={clsx(
            metadata.accuracy
              ? metadata.accuracy < 50
                ? 'text-lowColor'
                : 'text-highColor'
              : 'text-lowColor',
          )}>
          {metadata.accuracy}%
          {/* {isPathChanged ? 'Manual' : `${metadata.accuracy || 0}%`} */}
        </td>
        <td>
          <div className="flex gap-16px items-center justify-center">
            <p>{isPathChanged ? selectedPath : metadata.path || 'N/A'}</p>
            <button onClick={() => openModal(`moveFileWithAI${id}`)}>
              {<EditSVG />}
            </button>
          </div>
        </td>
        <td>
          <button
            onClick={handleRemove}
            className="text-red-600 font-bold px-2 hover:underline">
            X
          </button>
        </td>
      </tr>
      <EditPathModal
        id={id}
        setIsPathChanged={setIsPathChanged}
        setSelectedPath={setSelectedPath}
        setSelectedItem={setSelectedItem}
        onPathChange={handlePathChange}
      />
    </>
  );
};

export default FileAiResultsItem;

