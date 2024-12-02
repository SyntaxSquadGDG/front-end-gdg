'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useModal } from '@/app/_hooks/modal-provider';
import { revalidatePath } from 'next/cache';
import { usePathname } from 'next/navigation';
import { revalidatePathAction } from '@/app/actions';

const DragAndDropInput = ({ type, parentId, setFile, file, setFileData }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState(null);
  const { modalStack, setModal, openModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    console.log(`Modal stack is: ${modalStack}`);
  }, [modalStack]);

  const handleChange = () => {
    setFile(null);
    setFiles(null);
  };

  const handleConfirmAI = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      const response = await fetch('http://localhost:8000/classify-image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('SENT?');
      console.log(data);
      console.log('OP?');
      setFileData({
        accuracy: data.accuracy,
        path: data.path,
      });
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
      // const formData = new FormData();
      // Array.from(files).forEach((file) => {
      //   formData.append('files', file);
      // });

      // formData.append('folderId', parentId);

      // formData.append('file', 'file');

      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ': ' + pair[1]);
      // }
      // pres + bmc + video + src code
      // team teamNam
      const response = await fetch(
        `http://syntaxsquad.runasp.net/api/SFiles/test`,
        {
          method: 'POST',
          body: 'test',
        },
      );

      console.log(response);

      if (response.status === 404) throw new Error('Error');
      toast.success('Files uploaded successfully!');
      await revalidatePath();
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
    if (type === 'AI') {
      setFile(droppedFiles[0]);
    } else {
      setFiles(droppedFiles);
    }
  };

  const handleFilesChange = (e) => {
    const selectedFiles = e.target.files;
    if (type === 'AI') {
      setFile(selectedFiles[0]);
    } else {
      setFiles(selectedFiles);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (type === 'AI') {
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
              click to select a file
            </label>
            <input
              id="file-input"
              type="file"
              hidden
              accept="image/*"
              onChange={handleFilesChange}
            />
          </div>
        )}

        {file && (
          <div>
            <p className="mb-6">Your selected file:</p>
            <div className="flex flex-col gap-2">
              <h1 key={file.name}>{file.name}</h1>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleChange}
                className="border border-solid border-blue-600 px-6 py-2 rounded-lg text-lg font-medium">
                Change
              </button>
              <button
                onClick={handleConfirmAI}
                className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-2 rounded-lg text-white text-lg font-medium">
                Confirm
              </button>
            </div>
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
              <h1 key={file.name}>{file.name}</h1>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleChange}
              className="border border-solid border-blue-600 px-6 py-2 rounded-lg text-lg font-medium">
              Change
            </button>
            <button
              onClick={handleConfirmFiles}
              className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-2 rounded-lg text-white text-lg font-medium">
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragAndDropInput;

