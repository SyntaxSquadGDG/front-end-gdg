'use client';

import React, { useRef, useState } from 'react';
import PathArrowSVG from '../svgs/general/path-arrow';
import { contentFont } from '@/app/_utils/fonts';
import clsx from 'clsx';
import AddFolderSVG from '../svgs/folders/add';
import AddFileSVG from '../svgs/files/add';
import FileAddAiSVG from '../svgs/files/file-add-ai';
import ListViewSVG from '../svgs/sections/list-view';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import GridViewSVG from '../svgs/sections/grid-view';
import Modal from '../modals/modal';
import FileAIResults from '../files/file-ai-results';

const ToolBar = ({ views, view, setView, path, addFiles = true }) => {
  const t = useTranslations();
  const activeView =
    'px-[28px] py-[12px] rounded-[32px] bg-gradient-to-r from-[#CDAD8F] via-[#CDAD8F] to-[#FAE1CB]';
  const reversedPath = [...path].reverse();

  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Convert FileList to Array
    setFiles(selectedFiles);
  };

  const handleAIClick = (event) => {
    console.log('OPENED');
    openModal('AIFiles');
  };

  const [modalStack, setModalStack] = useState([]);

  const openModal = (modalId) => {
    setModalStack((prevStack) => [...prevStack, modalId]); // Push new modal to the stack
  };

  const closeModal = () => {
    setModalStack((prevStack) => prevStack.slice(0, -1)); // Remove the top modal from the stack
  };

  return (
    <div className="flex justify-between flex-wrap mb-[32px]">
      {/* Sections Text */}
      <div className="flex gap-[16px] items-center flex-wrap">
        <Link
          href="/sections"
          className={clsx(contentFont.className, 'text-[26px] font-medium')}>
          {t('sections.sections')}
        </Link>
        {reversedPath.map((item, index) => (
          <React.Fragment key={item.id}>
            <PathArrowSVG />
            <Link
              href={
                item.type === 'folder'
                  ? `/folders/${item.id}`
                  : item.type === 'file'
                  ? `/files/${item.id}`
                  : `/sections/${item.id}`
              }
              className={clsx(
                contentFont.className,
                'text-[26px] font-medium',
              )}>
              {item.name}
            </Link>
          </React.Fragment>
        ))}
      </div>
      {views && (
        <div className="flex gap-[16px] items-center flex-wrap">
          {/* VIEWS AND CREATION */}
          {/* VIEWS */}
          <div className="rounded-[32px] flex items-center border-[1px] border-solid border-blue1 w-fit">
            <button
              className={clsx(
                view === 'grid' ? activeView : 'pr-[12px] pl-[21px]',
              )}
              onClick={() => setView('grid')}>
              <GridViewSVG />
            </button>
            <button
              className={clsx(
                view === 'list' ? activeView : 'pl-[12px] pr-[21px]',
              )}
              onClick={() => setView('list')}>
              <ListViewSVG />
            </button>
          </div>

          {/* CREATION */}
          {/* <button
            className={clsx(
              'flex gap-[10px] items-center h-fit px-[32px] py-[10px] rounded-[10px] bg-gradient-to-r from-blue1 to-blue2 w-fit text-textLight',
              contentFont.className,
            )}
            onClick={() => handleAIClick()}>
            <FileAddAiSVG />
            <p className="text-[18px] font-medium">{t('files.addAI')}</p>
          </button> */}

          <button
            className={clsx(
              'flex gap-[10px] items-center h-fit px-[12px] py-[10px] rounded-[10px] border-[1px] border-solid border-blue1 w-fit',
              contentFont.className,
            )}
            onClick={() => openModal('createFolder')}>
            <AddFolderSVG />
          </button>
          {addFiles && (
            <>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                ref={inputRef}
              />

              <button
                className={clsx(
                  'flex gap-[10px] items-center h-fit px-[12px] py-[10px] rounded-[10px] border-[1px] border-solid border-blue1 w-fit',
                  contentFont.className,
                )}
                onClick={() => inputRef.current.click()}>
                <AddFileSVG />
              </button>
            </>
          )}
        </div>
      )}

      <Modal
        isOpen={modalStack.includes('createFolder')}
        onClose={closeModal}
        className={contentFont.className}>
        <h2 className="text-xl font-bold mb-[16px]">{t('folders.new')}</h2>
        <input
          type="text"
          className="w-[100%] py-[20px] rounded-[8px] px-[16px] border-[1px] border-solid border-blue1 outline-none mb-[16px]"
        />
        <input
          type="submit"
          className="w-[100%] py-[20px] rounded-[8px] px-[16px] bg-blue1 outline-none text-textLight"
        />
      </Modal>
      <Modal
        isOpen={modalStack.includes('AIFiles')}
        onClose={closeModal}
        className={''}>
        <FileAIResults />
      </Modal>
    </div>
  );
};

export default ToolBar;

