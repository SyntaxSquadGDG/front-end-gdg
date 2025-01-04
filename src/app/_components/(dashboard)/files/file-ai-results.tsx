'use client';
import AccuracyLevel from '@app/_components/(dashboard)/general/accuracy';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@/app/_utils/fonts';
import { revalidatePathAction } from '@/app/actions';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import FileIcon from '../general/file-icon';
import EditPathModal from '../modals/edit-path-modal';
import FileAiResultsItem from './file-ai-results-item';

const FileAIResults = ({ files, data, setFiles, setFilesData }) => {
  const { closeModal } = useModal();
  const t = useTranslations();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  console.log(files);

  useEffect(() => {
    console.log(data);
  }, [data]);

  function handleModalClose() {
    closeModal();
    setFiles(null);
    setFilesData(null);
  }

  async function handleConfirm() {
    try {
      setIsLoading(true);
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
      formData.append('path', data[0]?.path || ''); // Example: Assuming all files share the same path.
      const response = await fetch(
        `http://syntaxsquad.runasp.net/api/SFiles/upload?folderid=${
          data[0]?.folderId || ''
        }`,
        {
          method: 'POST',
          body: formData,
        },
      );

      closeModal();
      setFiles([]);
      setFilesData([]);
      await revalidatePathAction(pathName);
      toast.success('Classified successfully');
    } catch (e) {
      console.error('Error uploading files:', e);
      toast.error('Failed to classify files.');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={clsx(contentFont.className)}>
      <div className="flex justify-between items-center mb-[48px]">
        <p className="text-[22px] font-medium">New Files (With AI)</p>
        <div className="flex gap-[16px] items-center">
          <button
            className="px-[32px] py-[10px] rounded-[10px] border-[1px] border-solid border-blue1"
            onClick={() => handleConfirm()}>
            Confirm
          </button>
          <button
            className="px-[32px] py-[10px] rounded-[10px] bg-red-600 text-white"
            onClick={() => handleModalClose()}>
            Cancel
          </button>
        </div>
      </div>
      <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
        <table
          className={clsx(
            'table-auto w-full min-w-[700px] border-collapse',
            contentFont.className,
            'table',
          )}>
          <thead className="rounded-[32px]">
            <tr className="border-b-solid border-b-tableBorder ">
              <td>Level</td>
              <td>File</td>
              <td>File Name</td>
              <td>Accuracy</td>
              <td>Path</td>
            </tr>
          </thead>
          <tbody>
            {files &&
              Array.from(files).map((file, index) => {
                const metadata = data[index] || {}; // Match file with metadata or fallback to empty object
                return (
                  <FileAiResultsItem
                    key={`${file.name}-${file.lastModified}`}
                    file={file}
                    id={index}
                    setFiles={setFiles}
                    setFilesData={setFilesData}
                    metadata={metadata}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileAIResults;

