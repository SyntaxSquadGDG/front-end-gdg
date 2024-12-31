'use client';
import ActivitySection from '@app/_components/(dashboard)/activity-logs/activity-section';
import ToolBar from '@/app/_components/navbars/toolbar';
import ExcelSVG from '@/app/_components/svgs/files/excel';
import ImageSVG from '@/app/_components/svgs/files/image';
import PdfSVG from '@/app/_components/svgs/files/pdf';
import WordSVG from '@/app/_components/svgs/files/word';
import { contentFont } from '@/app/_utils/fonts';
import Button from '@app/_components/(dashboard)/general/button';
import HeadText from '@app/_components/(dashboard)/general/headtext';
import Input from '@app/_components/(dashboard)/general/input';
import RemoveSVG from '@app/_components/svgs/files/remove';
import RestoreSVG from '@app/_components/svgs/files/restore';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { getLangDir } from 'rtl-detect';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import FileIcon from '@app/_components/(dashboard)/general/file-icon';
import { fetcher } from '@app/_utils/fetch/fetch';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@app/actions';
import { useModal } from '@app/_contexts/modal-provider';
import DeleteFileModal from '@app/_components/(dashboard)/modals/delete-file-modal';

const Page = () => {
  const params = useParams<{ tag: string; item: string }>();
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [loadingPath, setLoadingPath] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { openModal, closeModal, modalStack } = useModal();

  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await fetcher(`/Sfiles/filebyid?fileid=${id}`, {
          next: { revalidate: 0, tags: ['fileId', id] },
        });
        setFile(data);
        console.log(data);
      } catch (e) {
        console.log('ERROR', e);
      } finally {
        setLoading(false);
      }
    }

    async function fetchPath() {
      try {
        setLoadingPath(true);
        const data = await fetcher(`/Sfiles/Path/${id}`, {
          next: { revalidate: 0, tags: ['filepath', id] },
        });
        setFilePath(data);
      } catch (e) {
        console.log('ERROR', e);
      } finally {
        setLoadingPath(false);
      }
    }

    fetchData();
    fetchPath();
  }, []);

  const t = useTranslations();
  const locale = useLocale();
  const direction = getLangDir(locale);

  // const [isLoadingPath, setIsLoadingPath] = useState(false);

  // const path = [
  //   { id: 5, type: 'file', name: 'MyFile' },
  //   { id: 4, type: 'folder', name: 'Folder2' },
  //   { id: 3, type: 'folder', name: 'Folder1' },
  //   { id: 1, type: 'section', name: 'MySection' },
  // ];

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const response = await fetch(
        `http://syntaxsquad.runasp.net/api/Sfiles/deleteById?fileid=${id}`,
        {
          method: 'DELETE',
        },
      );
      if (response.status === 404) throw new Error('Error');
      toast.success('Deleted');
    } catch (e) {
      toast.error('Error while Creating the section');
    } finally {
      setIsDeleting(false);
    }
    await revalidatePathAction(`/folders/${file.parentFolderId}`);
    redirect(`/folders/${file.parentFolderId}`);
  }

  const versions = [
    {
      uploaded: '28/10/2024',
      type: 'pdf',
      name: 'myFileOld',
    },
    {
      uploaded: '28/11/2024',
      type: 'pdf',
      name: 'myFileOld2',
    },
    {
      uploaded: '28/12/2024',
      type: 'pdf',
      name: 'myFileOld3',
    },
  ];

  return (
    <div>
      {!filePath && 'loading path...'}
      {filePath && (
        <ToolBar views={false} setView={''} view={''} path={filePath} />
      )}
      {!file && 'Loading...'}
      {file && (
        <div className="flex flex-col gap-[24px]">
          <div
            className={clsx(
              direction === 'ltr'
                ? 'xl:mr-[calc(var(--activitySpace))]'
                : 'xl:ml-[calc(var(--activitySpace))]',
              contentFont.className,
              'flex flex-col gap-[24px]',
            )}>
            {/* FILE P1 */}
            <div className="flex flex-col gap-[24px]">
              {/* FILE */}
              <Link
                href={`/files/${id}/preview`}
                className="flex gap-[10px] items-center justify-start ">
                {/* Type */}
                <div>
                  <FileIcon type={file.type} />
                </div>

                {/* Name + size */}
                <div className="flex flex-col gap-[10px]">
                  <p className="text-black text-[18px] font-medium">
                    {file.name}
                  </p>
                  <p className="text-textGray text-[14px] font-medium">
                    {file.size}
                  </p>
                </div>
              </Link>

              {/* actions */}
              <div className="flex gap-[16px] items-center">
                <Button
                  text={t('files.viewMetaData')}
                  onClick={() => {}}
                  variant="fill"
                />
                <Button
                  text={t('files.uploadNewVersion')}
                  onClick={() => {}}
                  variant="outline"
                />
                <Button
                  text={'Delete'}
                  disabled={isDeleting}
                  onClick={() => openModal(`deleteFileModal${id}`)}
                  className={clsx(
                    'bg-red-400 text-textLight',
                    isDeleting && 'cursor-not-allowed',
                  )}
                />
                <DeleteFileModal
                  id={id}
                  parentId={file.parentFolderId}
                  redirect={true}
                />
              </div>
            </div>

            {/* FILE P2 */}
            <div className="flex flex-col gap-[24px]">
              <div className="flex justify-between items-center flex-col md:flex-row gap-[24px] md:gap-[48px]">
                <div className="flex-grow">
                  <HeadText bigSpace={false}>{t('files.documentId')}</HeadText>
                  <Input readOnly={true} value={id} />
                </div>
                <div className="flex-grow">
                  <HeadText bigSpace={false}>{t('files.ocrLanguage')}</HeadText>
                  <Input readOnly={true} value={'English'} />
                </div>
              </div>
              <div>
                <HeadText bigSpace={false}>{t('files.lock')}</HeadText>
                <Button
                  text={t('files.lockButton')}
                  onClick={() => {}}
                  variant="fill"
                  expand={true}
                />
              </div>
            </div>

            {/* FILE P3 */}
            <div>
              <HeadText>{t('files.otherVersions')}</HeadText>

              <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
                <table
                  className={clsx(
                    'table-auto w-full min-w-[700px] border-collapse',
                    contentFont.className,
                    'table',
                  )}>
                  <thead className="rounded-[32px]">
                    <tr className="font-semibold text-[20px] border-b-solid border-b-tableBorder ">
                      <td>{t('files.uploaded')}</td>
                      <td>{t('files.fileName')}</td>
                      <td>{t('files.restore')}</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody className="">
                    {versions.map((version, index) => {
                      return (
                        <tr key={index}>
                          <td>{version.uploaded}</td>
                          <td>{version.name}</td>
                          <td>
                            <button onClick={() => {}}>
                              <RestoreSVG />
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => {}}
                              className="flex items-center justify-center gap-[10px] items-center w-[100%]">
                              <RemoveSVG />
                              <p className="text-dangerColor text-[16px] font-normal">
                                {t('general.remove')}
                              </p>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <ActivitySection />
        </div>
      )}
    </div>
  );
};

export default Page;

