'use client';
import AccuracyLevel from '@app/_components/(dashboard)/general/accuracy';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@/app/_utils/fonts';
import { revalidatePathAction } from '@/app/actions';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import FileIcon from '../general/file-icon';

const FileAIResults = ({ file, data, setFile, setFileData }) => {
  const { closeModal } = useModal();
  const t = useTranslations();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);

  const handleClick = () => {
    if (file) {
      const imageURL = URL.createObjectURL(file); // Create a temporary URL for the file
      window.open(imageURL, '_blank'); // Open the image in a new tab
      // Optional: Revoke the object URL after opening to free memory
      setTimeout(() => URL.revokeObjectURL(imageURL), 1000);
    }
  };

  async function handleConfirm() {
    // // REQUEST
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('files', file);
      formData.append('path', data.path);
      const response = await fetch(
        `http://syntaxsquad.runasp.net/api/SFiles/upload?folderid=${data.folderId}`,
        {
          method: 'POST',
          body: formData,
        },
      );

      closeModal();
      setFile(null);
      setFileData(null);
      await revalidatePathAction(pathName);
      toast.success('Classified successfully');
    } catch (e) {
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
            onClick={() => closeModal()}>
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
          <tbody className="">
            <tr className="py-[40px] font-medium text-[18px] rounded-[32px]">
              <td>
                <div className="flex items-center justify-center">
                  <AccuracyLevel accuracy={data.accuracy || 0} />
                </div>
              </td>
              <td>
                <button onClick={handleClick}>
                  <FileIcon type={file.type} />
                </button>
              </td>
              <td>{file.name}</td>
              <td
                className={clsx(
                  data.accuracy
                    ? data.accuracy < 50
                      ? 'text-lowColor'
                      : 'text-highColor'
                    : 'text-lowColor',
                )}>
                {data.accuracy || 0}%
              </td>
              <td>{data.path}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileAIResults;

