import {
  fetchFileData,
  fetchFilePath,
  fetchFilePreview,
} from '@app/_components/(dashboard)/files/data/queries';
import ErrorBoundary from '@app/_components/(dashboard)/general/error-boundary';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadErrorDiv from '@app/_components/(dashboard)/general/load-error-div';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import RefetchWrapper from '@app/_components/(dashboard)/general/refetch-wrapper';
import ToolBar from '@app/_components/navbars/toolbar';
import ImageViewer from '@app/_components/previewers/image-viewer';
import MarkdownRenderer from '@app/_components/previewers/markdown-preview';
import { ViewProvider } from '@app/_contexts/view-provider';
import { contentFont } from '@app/_utils/fonts';
import { getErrorText } from '@app/_utils/translations';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

const page = async ({ params }) => {
  const id = (await params).id;
  const t = await getTranslations();

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
      return (
        <LoadErrorDiv>
          <LoadError>{errorText}</LoadError>
          <RefetchWrapper tag={`file${id}Path`} />
        </LoadErrorDiv>
      );
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
              <ImageViewer src={`data:image/png;base64,${preview.f}`} />
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
      return (
        <LoadErrorDiv>
          <LoadError>{errorText}</LoadError>
          <RefetchWrapper tag={`file${id}Preview`} />
        </LoadErrorDiv>
      );
    }
  };

  return (
    <ViewProvider>
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
    </ViewProvider>
  );
};

export default page;

