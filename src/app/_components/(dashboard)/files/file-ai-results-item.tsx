'use client';

import React, { useState } from 'react';
import AccuracyLevel from '../general/accuracy';
import FileIcon from '../general/file-icon';
import clsx from 'clsx';
import EditPathModal from '../modals/edit-path-modal';
import { useModal } from '@app/_contexts/modal-provider';

const FileAiResultsItem = ({ id, file, setFiles, metadata, setFilesData }) => {
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
    setFilesData((prevData) => {
      const updatedData = [...prevData]; // Copy the current state
      updatedData[id] = {
        ...updatedData[id],
        accuracy: 'manual',
        path: selectedPath,
        folderId: newFolderId,
      }; // Update path and folderId
      return updatedData; // Return the updated state
    });
  };

  const handleRemove = () => {
    // Update the files state
    setFiles((prevFiles) => {
      const updatedFiles = Array.from(prevFiles); // Convert to array
      updatedFiles.splice(id, 1); // Remove the file at the specified index
      return updatedFiles; // Return updated ArrayList or array
    });

    // Update the filesData state
    setFilesData((prevData) => {
      const updatedData = Array.from(prevData); // Convert to array
      updatedData.splice(id, 1); // Remove metadata at the specified index
      console.log(updatedData);
      return updatedData; // Return updated ArrayList or array
    });
  };

  const { openModal, closeModal } = useModal();

  const [isPathChanged, setIsPathChanged] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedItem, setSelectedItem] = useState({ type: null, id: null });

  return (
    <>
      <tr className="py-[40px] font-medium text-[18px] rounded-[32px]">
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
          {isPathChanged ? 'Manual' : `${metadata.accuracy || 0}%`}
        </td>
        <td>
          {isPathChanged ? selectedPath : metadata.path || 'N/A'}
          <button onClick={() => openModal(`moveFileWithAI${id}`)}>Edit</button>
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

