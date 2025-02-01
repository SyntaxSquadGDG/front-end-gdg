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
import Modal from '../(dashboard)/modals/modal';
import FileAIResults from '../(dashboard)/files/file-ai-results';
import DragAndDropInput from '../(dashboard)/files/drag-drop';
import { useModal } from '@app/_contexts/modal-provider';
import AddSVG from '../svgs/general/add';
import CreateSectionModal from '../(dashboard)/modals/create-section-modal';
import CreateFolderModal from '../(dashboard)/modals/create-folder-modal';
import { getLangDir } from 'rtl-detect';
import { usePathname } from 'next/navigation';
import { useView } from '@app/_contexts/view-provider';
import useElementHeight from '@app/_hooks/useheight';

const ToolBar = ({
  views,
  path,
  addFiles = true,
  type,
  id,
  viewOnly,
  pathRequired = true,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const direction = getLangDir(locale);
  const { modalStack, openModal, closeModal } = useModal();
  const activeView = 'px-28px py-12px rounded-[32px] bg-goldLinear';
  const reversedPath = path ? [...path].reverse() : null;
  const fullPathname = usePathname();
  const pathName = `/${fullPathname.split('/').slice(2).join('/')}`;
  const { view, setGrid, setList } = useView();

  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  const { ref, height } = useElementHeight();

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
    <>
      <div
        style={{ height: height ? `${height}px` : 'auto' }}
        className="mt-[-24px] mb-4px z-[-1]"
      />
      <div
        ref={ref}
        className={clsx(
          'flex items-center justify-between gap-48px bg-white flex-wrap',
          'fixed top-[var(--horizontalNavHeight)] py-32px w-[calc(100%-var(--verticalNavSmallWidth))] lg:w-[calc(100%-var(--verticalNavWidth))] z-[9999] lg:left-[var(--verticalNavWidth)] left-[var(--verticalNavSmallWidth)] px-32px',
        )}>
        {/* Sections Text */}
        <div className="flex gap-16px items-center flex-wrap">
          {pathName === '/sections' && (
            <Link
              href="/sections"
              className={clsx('font-content', 'text-26px font-medium')}>
              {t('sections.sections')}
            </Link>
          )}
          {pathName === '/folders' && (
            <Link
              href="/folders"
              className={clsx('font-content', 'text-26px font-medium')}>
              {t('folders.folders')}
            </Link>
          )}
          {pathName === '/files' && (
            <Link
              href="/files"
              className={clsx('font-content', 'text-26px font-medium')}>
              {t('files.files')}
            </Link>
          )}

          {reversedPath &&
            reversedPath.map((item, index) => (
              <React.Fragment key={`${item.type}${item.id}`}>
                <Link
                  href={
                    item.type === 'folder'
                      ? `/folders/${item.id}`
                      : item.type === 'file'
                      ? `/files/${item.id}`
                      : `/sections/${item.id}`
                  }
                  className={clsx('font-content', 'text-26px font-medium')}>
                  {item.name}
                </Link>
                {index !== reversedPath.length - 1 && <PathArrowSVG />}
              </React.Fragment>
            ))}

          {pathRequired && !path && <h2>Error While fetching path</h2>}
        </div>
        {views && (
          <div className="flex gap-16px items-center flex-wrap">
            {/* VIEWS AND CREATION */}
            {/* VIEWS */}
            <div className="rounded-[32px] flex items-center border-[1px] border-solid border-blue1 w-fit">
              <button
                className={clsx(
                  view === 'grid'
                    ? activeView
                    : direction === 'ltr'
                    ? 'pr-12px pl-[21px]'
                    : 'pl-12px pr-[21px]',
                )}
                onClick={setGrid}>
                <GridViewSVG />
              </button>
              <button
                className={clsx(
                  view === 'list'
                    ? activeView
                    : direction === 'ltr'
                    ? 'pl-12px pr-[21px]'
                    : 'pr-12px pl-[21px]',
                )}
                onClick={setList}>
                <ListViewSVG />
              </button>
            </div>

            {/* CREATION */}

            {!viewOnly && (
              <>
                <button
                  className={clsx(
                    'flex gap-10px items-center h-fit px-32px py-10px rounded-[10px] bg-mainColor1 w-fit text-textLight',
                    'font-content',
                  )}
                  onClick={() => handleAIClick()}>
                  <FileAddAiSVG />
                  <p className="text-18px font-medium">{t('files.addAI')}</p>
                </button>

                <button
                  className={clsx(
                    'flex gap-10px items-center h-fit px-32px py-10px rounded-[10px] border-[1px] border-solid border-blue1 w-fit text-textDark',
                    'font-content',
                  )}
                  onClick={() => openModal('createSection')}>
                  <AddSVG />
                  <p className="text-18px font-medium">
                    {t('sections.create')}
                  </p>
                </button>
              </>
            )}
            {path && (
              <button
                className={clsx(
                  'flex gap-10px items-center h-fit px-12px py-10px rounded-[10px] border-[1px] border-solid border-blue1 w-fit',
                  'font-content',
                )}
                onClick={() => openModal('createFolder')}>
                <AddFolderSVG />
              </button>
            )}
            {path && addFiles && (
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
                    'flex gap-10px items-center h-fit px-12px py-10px rounded-[10px] border-[1px] border-solid border-blue1 w-fit',
                    'font-content',
                  )}
                  onClick={() => openModal('uploadFiles')}>
                  <AddFileSVG />
                </button>
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
          <FileAIResults
            file={file}
            data={fileData}
            setFile={setFile}
            setFileData={setFileData}
          />
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
    </>
  );
};

export default ToolBar;

