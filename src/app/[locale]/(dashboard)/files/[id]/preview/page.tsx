import {
  fetchFileData,
  fetchFilePath,
  fetchFilePreview,
} from '@app/_components/(dashboard)/files/data/queries';
import ErrorBoundary from '@app/_components/(dashboard)/general/error-boundary';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import ToolBar from '@app/_components/navbars/toolbar';
import ImageViewer from '@app/_components/previewers/image-viewer';
import MarkdownRenderer from '@app/_components/previewers/markdown-preview';
import { fetcher } from '@app/_utils/fetch/fetch';
import { contentFont } from '@app/_utils/fonts';
import { getErrorText } from '@app/_utils/translations';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

const page = async ({ params }) => {
  const id = (await params).id;
  const t = await getTranslations();
  let data;
  let file;
  let path;

  try {
    data = await fetcher(`/sfiles/filebyidpreview?fileid=${id}`, {
      next: { revalidate: 0, tags: ['filePreview', id] },
    });
    console.log('DATA IS ');
    console.log(data);
  } catch (e) {
    console.log(e);
  } finally {
  }

  try {
    file = await fetcher(`/Sfiles/filebyid?fileid=${id}`, {
      next: { revalidate: 0, tags: ['fileId', id] },
    });
    console.log(data);
  } catch (e) {
    console.log(e);
  } finally {
  }

  try {
    path = await fetcher(`/Sfiles/Path/${id}`, {
      next: { revalidate: 0, tags: ['filepath', id] },
    });
  } catch (e) {
    console.log(e);
  } finally {
  }

  const pathArray = [];
  const reversedPath = path ? [...path].reverse() : null;

  for (const item of reversedPath) {
    const href =
      item.type === 'folder'
        ? `/folders/${item.id}`
        : item.type === 'file'
        ? `/files/${item.id}`
        : `/sections/${item.id}`;

    pathArray.push({ text: item.name, href: href });
  }

  console.log(data);

  const PathDataWrapper = async () => {
    try {
      const path = await fetchFilePath(id);

      return (
        <>
          <ToolBar path={path} views={false} addFiles={false} />
        </>
      );
    } catch (error) {
      const errorText = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILE_PATH_ERROR`,
      );
      return <LoadError>{errorText}</LoadError>;
    }
  };

  const FileDataWrapper = async () => {
    try {
      const data = await fetchFileData(id);
      const preview = await fetchFilePreview(id);

      return (
        <>
          <div className="flex flex-col lg:flex-row gap-[48px]">
            <div className="w-[100%]">
              <ImageViewer src={`data:image/png;base64,${data.f}`} />
            </div>
            <div className="w-[100%] p-[16px] overflow-hidden bg-slate-200">
              <h2
                className={clsx(
                  'text-mainColor1 text-[24px] mb-[32px] font-bold',
                  contentFont.className,
                )}>
                OCR Text
              </h2>
              <MarkdownRenderer markdown={data.ocr} />
            </div>
          </div>
        </>
      );
    } catch (error) {
      const errorText = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILE_PREVIEW_ERROR`,
      );
      return <LoadError>{errorText}</LoadError>;
    }
  };

  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <PathDataWrapper />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <FileDataWrapper />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default page;

