'use client';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@/app/_utils/fonts';
import { revalidatePathAction } from '@/app/actions';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import FileAiResultsItem from './file-ai-results-item';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { confirmAIFiles } from './data/posts';
import { getErrorText } from '@app/_utils/translations';
import LoadingSpinner from '../general/loader';
import ErrorAction from '../general/error-action';
import Modal from '../modals/modal';

const FileAIResults = ({ files, data, setFiles, setFilesData }) => {
  const { closeModal } = useModal();
  const t = useTranslations();
  const [errorText, setErrorText] = useState(null);
  const queryClient = useQueryClient();

  console.log(files);

  useEffect(() => {
    console.log(data);
  }, [data]);

  function handleModalClose() {
    closeModal();
    setFiles(null);
    setFilesData(null);
  }

  async function handleSend() {
    setErrorText(null);
    const formData = new FormData();
    console.log(files[0]);
    formData.append('files', files[0]);
    formData.append('folderId', 4);
    sendMutation.mutate({ folderId: 4, formData });
  }

  const sendMutation = useMutation({
    mutationFn: ({ folderId, formData }) => confirmAIFiles(folderId, formData),
    onSuccess: async (_, { folderId }) => {
      console.log('SUCC');
      await queryClient.invalidateQueries(['files', folderId]);
      await queryClient.invalidateQueries(['folders']);

      toast.success(t('files.classified'));
      setFiles([]);
      setFilesData([]);
      closeModal();
    },
    onError: async (error) => {
      console.log('ERRRRRRRRRRRRRRRR');
      await queryClient.invalidateQueries(['files', folderId]);
      // await queryClient.invalidateQueries(['folders']);
      toast.success(t('files.classified'));
      setFiles([]);
      setFilesData([]);
      closeModal();

      // const textError = getErrorText(
      //   t,
      //   `files.errors.${error?.message}`,
      //   `files.errors.FILES_CLASSIFICATION_ERROR`,
      // );
      // setErrorText(textError);
      // toast.error(textError);
    },
  });

  if (sendMutation.isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className={clsx('font-content')}>
      <div className="flex justify-between items-center mb-48px">
        <p className="text-22px font-medium">New Files (With AI)</p>
        <div className="flex gap-16px items-center">
          <button
            className="px-32px py-10px rounded-[10px] border-[1px] border-solid border-blue1"
            onClick={() => handleSend()}>
            Confirm
          </button>
          <button
            className="px-32px py-10px rounded-[10px] bg-red-600 text-white"
            onClick={() => handleModalClose()}>
            Cancel
          </button>
        </div>
      </div>
      <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
        <table
          className={clsx(
            'table-auto w-full min-w-[700px] border-collapse',
            'font-content',
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
                    index={index}
                    key={`${file.name}-${file.lastModified}`}
                    file={file}
                    id={index}
                    files={files}
                    filesData={data}
                    setFiles={setFiles}
                    setFilesData={setFilesData}
                    metadata={metadata}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      <ErrorAction>{errorText}</ErrorAction>
    </div>
  );
};

export default FileAIResults;

