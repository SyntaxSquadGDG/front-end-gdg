'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useModal } from '@app/_contexts/modal-provider';
import { revalidatePath } from 'next/cache';
import { usePathname } from 'next/navigation';
import { revalidatePathAction } from '@/app/actions';
import { extractPath } from '@app/_utils/helper';
import {
  UploadNewVersion,
  classifyAIFiles,
  sendFilesToFolder,
  uploadNewFileVersion,
} from './data/posts';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { getErrorText } from '@app/_utils/translations';
import LoadingSpinner from '../general/loader';
import ErrorAction from '../general/error-action';

const DragAndDropInput = ({
  type,
  parentId,
  setFiles = () => {},
  files,
  setFilesData = () => {},
  file,
  setFile,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const { modalStack, setModal, openModal, closeModal } = useModal();
  const [errorText, setErrorText] = useState(null);
  const pathName = usePathname();
  const t = useTranslations();

  useEffect(() => {
    console.log(`Modal stack is: ${modalStack}`);
  }, [modalStack]);

  const handleChange = () => {
    setFiles(null);
    setFile(null);
  };

  async function handleClassifyAI() {
    setErrorText(null);
    classifyAIMutation.mutate(files);
  }

  const classifyAIMutation = useMutation({
    mutationFn: (data) => classifyAIFiles(data),
    onSuccess: async (data) => {
      setModal('AIResults');
      closeModal();
      setFilesData(data);
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILES_CLASSIFICATION_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  async function handleConfirmFolderFiles() {
    setErrorText(null);
    confirmFolderFilesMutation.mutate(files);
  }

  const confirmFolderFilesMutation = useMutation({
    mutationFn: (data) => sendFilesToFolder(parentId, data),
    onSuccess: async () => {
      closeModal();
      toast.success(t('files.filesUploaded'));
      await revalidatePathAction(`/folders/${parentId}`);
      setFiles(null);
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILES_UPLOAD_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  async function handleConfirmFileVersion() {
    setErrorText(null);
    confirmFileVersionMutation.mutate(file);
  }

  const confirmFileVersionMutation = useMutation({
    mutationFn: (data) => uploadNewFileVersion(parentId, data),
    onSuccess: async () => {
      closeModal();
      toast.success(t('files.versionUpdated'));
      await revalidatePathAction(`/files/${parentId}`);
      setFile(null);
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILE_UPLOAD_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  const handleConfirmAI = async () => {
    try {
      setIsLoading(true);

      // const formData = new FormData();
      // formData.append('files', file);
      // formData.append('folderId', null);

      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ': ' + pair[1]);
      // }
      // const response = await fetch(
      //   `http://syntaxsquad.runasp.net/api/Sfiles/uploadbyai`,
      //   {
      //     method: 'POST',
      //     body: formData,
      //   },
      // );
      // const data = await response.json();
      // console.log('SENT?');
      // console.log(data);
      // const myPath = extractPath(data.path);
      // console.log(myPath);
      // console.log('OP?');
      setFilesData([
        {
          accuracy: 95,
          path: 'myPath',
          name: 'file name',
          type: 'type',
          folderId: 111111,
        },
        {
          accuracy: 65,
          path: 'myPath',
          name: 'file name',
          type: 'type',
          folderId: 2222222,
        },
        {
          accuracy: 75,
          path: 'myPath',
          name: 'file name',
          type: 'type',
          folderId: 3333333,
        },
        {
          accuracy: 15,
          path: 'myPath',
          name: 'file name',
          type: 'type',
          folderId: 444444,
        },
      ]);
      setModal('AIResults');
      await revalidatePathAction(pathName);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmFiles = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });

      // formData.append('file', 'file');

      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ': ' + pair[1]);
      // }
      const response = await fetch(
        `http://syntaxsquad.runasp.net/api/SFiles/upload?folderid=${parentId}`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const res = await response.json();

      console.log(response);
      console.log(res);

      if (response.status === 404) throw new Error('Error');
      toast.success(t('files.filesUploaded'));
      closeModal();
      setFiles(null);
      setFilesData(null);
      await revalidatePathAction(pathName);
    } catch (error) {
      toast.error('Error while uploading the files');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = e.dataTransfer.files;

    if (type === 'version') {
      setFile(droppedFiles[0]);
    } else {
      setFiles(droppedFiles);
    }
  };

  const handleFilesChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleClick = (file) => {
    if (file) {
      const imageURL = URL.createObjectURL(file); // Create a temporary URL for the file
      window.open(imageURL, '_blank'); // Open the image in a new tab
      // Optional: Revoke the object URL after opening to free memory
      setTimeout(() => URL.revokeObjectURL(imageURL), 1000);
    }
  };

  async function onVersionSuccess() {
    await revalidatePathAction(`/files/${parentId}`);
    toast.success(t('files.versionUpdated'));
    setFile(null);
    closeModal();
  }

  async function handleConfirmVersion() {
    // try {
    //   setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    // formData.append('file', 'file');

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }
    const response = await UploadNewVersion(
      parentId,
      setIsLoading,
      setError,
      onVersionSuccess,
      t,
      toast,
    );

    console.log('??');

    // console.log(response);
    // console.log(res);

    // if (response.status === 404) throw new Error('Error');
    // toast.success('Files uploaded successfully!');
    // closeModal();
    // setFiles(null);
    // setFilesData(null);
    // await revalidatePathAction(pathName);
    // } catch (error) {
    //   toast.error('Error while uploading the files');
    // } finally {
    //   setIsLoading(false);
    // }
  }

  if (
    confirmFileVersionMutation.isPending ||
    classifyAIMutation.isPending ||
    confirmFolderFilesMutation.isPending
  ) {
    return <LoadingSpinner />;
  }

  if (type === 'version') {
    return (
      <div>
        {!file && (
          <div
            className={`flex flex-col items-center justify-center w-full h-40 border-2 ${
              dragActive
                ? 'border-blue-600 bg-blue-50'
                : 'border-dashed border-gray-400'
            } rounded-lg bg-white transition`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}>
            <p className="text-gray-600">Drag and drop your file here, or</p>
            <label
              htmlFor="file-input"
              className="cursor-pointer text-blue-600 underline hover:text-blue-800">
              click to select file
            </label>
            <input
              id="file-input"
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </div>
        )}

        {file && (
          <div>
            <p className="mb-6">Your selected files:</p>
            <div className="flex flex-col gap-2">
              <h3
                key={file.name}
                onClick={() => handleClick(file)}
                className="underline cursor-pointer">
                {file.name}
              </h3>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleChange}
                className="border border-solid border-blue-600 px-6 py-2 rounded-lg text-lg font-medium">
                Change
              </button>
              <button
                onClick={handleConfirmFileVersion}
                className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-2 rounded-lg text-white text-lg font-medium">
                Confirm
              </button>
            </div>
            <ErrorAction>{errorText}</ErrorAction>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {!files && (
        <div
          className={`flex flex-col items-center justify-center w-full h-40 border-2 ${
            dragActive
              ? 'border-blue-600 bg-blue-50'
              : 'border-dashed border-gray-400'
          } rounded-lg bg-white transition`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}>
          <p className="text-gray-600">Drag and drop your files here, or</p>
          <label
            htmlFor="file-input"
            className="cursor-pointer text-blue-600 underline hover:text-blue-800">
            click to select files
          </label>
          <input
            id="file-input"
            type="file"
            hidden
            multiple
            onChange={handleFilesChange}
          />
        </div>
      )}

      {files && (
        <div>
          <p className="mb-6">Your selected files:</p>
          <div className="flex flex-col gap-2">
            {Array.from(files).map((file) => (
              <h3
                key={file.name}
                onClick={() => handleClick(file)}
                className="underline cursor-pointer">
                {file.name}
              </h3>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleChange}
              className="border border-solid border-blue-600 px-6 py-2 rounded-lg text-lg font-medium"
              disabled={
                classifyAIMutation.isPending ||
                confirmFolderFilesMutation.isPending
              }>
              Change
            </button>
            <button
              onClick={
                type === 'AI'
                  ? () => handleClassifyAI()
                  : () => handleConfirmFolderFiles()
              }
              className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-2 rounded-lg text-white text-lg font-medium"
              disabled={
                classifyAIMutation.isPending ||
                confirmFolderFilesMutation.isPending
              }>
              Confirm
            </button>
          </div>
          <ErrorAction>{errorText}</ErrorAction>
        </div>
      )}
    </div>
  );
};

export default DragAndDropInput;

