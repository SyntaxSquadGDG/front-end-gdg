'use client';

import React, { useEffect, useRef, useState } from 'react';
import PathArrowSVG from '../svgs/general/path-arrow';
import { contentFont } from '@/app/_utils/fonts';
import clsx from 'clsx';
import AddFolderSVG from '../svgs/folders/add';
import AddFileSVG from '../svgs/files/add';
import FileAddAiSVG from '../svgs/files/file-add-ai';
import ListViewSVG from '../svgs/sections/list-view';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import GridViewSVG from '../svgs/sections/grid-view';
import Modal from '../modals/modal';
import FileAIResults from '../files/file-ai-results';
import DragAndDropInput from '../files/drag-drop';
import { useModal } from '@app/_contexts/modal-provider';
import AddSVG from '../svgs/general/add';
import CreateSectionModal from '../modals/create-section-modal';
import CreateFolderModal from '../modals/create-folder-modal';
import { getLangDir } from 'rtl-detect';

const ToolBar = ({
  views,
  view,
  setView,
  path,
  addFiles = true,
  type,
  id,
  pathRequired = true,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const direction = getLangDir(locale);
  const { modalStack, openModal, closeModal } = useModal();
  const activeView = 'px-[28px] py-[12px] rounded-[32px] bg-goldLinear';
  const reversedPath = path ? [...path].reverse() : null;

  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const inputRef = useRef(null);

  console.log(type);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Convert FileList to Array
    setFiles(selectedFiles);
  };

  const handleAIClick = (event) => {
    openModal('uploadAIFiles');
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
        {reversedPath &&
          reversedPath.map((item, index) => (
            <React.Fragment key={`${item.type}${item.id}`}>
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

        {pathRequired && !path && <h2>Error While fetching path</h2>}
      </div>
      {views && (
        <div className="flex gap-[16px] items-center flex-wrap">
          {/* VIEWS AND CREATION */}
          {/* VIEWS */}
          <div className="rounded-[32px] flex items-center border-[1px] border-solid border-blue1 w-fit">
            <button
              className={clsx(
                view === 'grid'
                  ? activeView
                  : direction === 'ltr'
                  ? 'pr-[12px] pl-[21px]'
                  : 'pl-[12px] pr-[21px]',
              )}
              onClick={() => setView('grid')}>
              <GridViewSVG />
            </button>
            <button
              className={clsx(
                view === 'list'
                  ? activeView
                  : direction === 'ltr'
                  ? 'pl-[12px] pr-[21px]'
                  : 'pr-[12px] pl-[21px]',
              )}
              onClick={() => setView('list')}>
              <ListViewSVG />
            </button>
          </div>

          {/* CREATION */}

          <button
            className={clsx(
              'flex gap-[10px] items-center h-fit px-[32px] py-[10px] rounded-[10px] bg-mainColor1 w-fit text-textLight',
              contentFont.className,
            )}
            onClick={() => handleAIClick()}>
            <FileAddAiSVG />
            <p className="text-[18px] font-medium">{t('files.addAI')}</p>
          </button>

          <button
            className={clsx(
              'flex gap-[10px] items-center h-fit px-[32px] py-[10px] rounded-[10px] border-[1px] border-solid border-blue1 w-fit text-textDark',
              contentFont.className,
            )}
            onClick={() => openModal('createSection')}>
            <AddSVG />
            <p className="text-[18px] font-medium">{t('sections.create')}</p>
          </button>

          {path && (
            <button
              className={clsx(
                'flex gap-[10px] items-center h-fit px-[12px] py-[10px] rounded-[10px] border-[1px] border-solid border-blue1 w-fit',
                contentFont.className,
              )}
              onClick={() => openModal('createFolder')}>
              <AddFolderSVG />
            </button>
          )}
          {path && addFiles && (
            <>
              {/* <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                ref={inputRef}
              /> */}

              {/* <button
                className={clsx(
                  'flex gap-[10px] items-center h-fit px-[12px] py-[10px] rounded-[10px] border-[1px] border-solid border-blue1 w-fit',
                  contentFont.className,
                )}
                onClick={() => openModal('uploadFiles')}>
                <AddFileSVG />
              </button> */}
            </>
          )}
        </div>
      )}

      <CreateFolderModal type={type} id={id} />
      <CreateSectionModal />

      <Modal
        isOpen={modalStack.includes('uploadFiles')}
        noOutside={true}
        onClose={closeModal}
        className={''}>
        <DragAndDropInput
          type={'file'}
          parentId={id}
          setFile={setFile}
          file={file}
          setFileData={setFileData}
        />
      </Modal>

      <Modal
        isOpen={modalStack.includes('AIResults')}
        onClose={closeModal}
        noOutside={true}>
        <FileAIResults file={file} data={fileData} />
      </Modal>

      <Modal
        isOpen={modalStack.includes('uploadAIFiles')}
        noOutside={true}
        onClose={closeModal}
        className={''}>
        <DragAndDropInput
          type={'AI'}
          parentId={id}
          setFile={setFile}
          file={file}
          setFileData={setFileData}
        />
      </Modal>
    </div>
  );
};

export default ToolBar;

