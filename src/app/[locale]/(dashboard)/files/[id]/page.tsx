import ActivitySection from '@app/_components/(dashboard)/activity-logs/activity-section';
import ToolBar from '@/app/_components/navbars/toolbar';
import { contentFont } from '@/app/_utils/fonts';
import clsx from 'clsx';
import React, { Suspense } from 'react';
import { getLangDir } from 'rtl-detect';
import {
  fetchFileData,
  fetchFilePath,
  fetchfileData,
} from '@app/_components/(dashboard)/files/data/queries';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import { getLocale, getTranslations } from 'next-intl/server';
import FileDetails from '@app/_components/(dashboard)/files/file-details';
import FileInfo from '@app/_components/(dashboard)/files/file-info';
import FileVersions from '@app/_components/(dashboard)/files/file-versions';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import ErrorBoundary from '@app/_components/(dashboard)/general/error-boundary';
import { ViewProvider } from '@app/_contexts/view-provider';
import FileSettingsModals from '@app/_components/(dashboard)/files/file-settings-modals';
import { getErrorText } from '@app/_utils/translations';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadErrorDiv from '@app/_components/(dashboard)/general/load-error-div';
import RefetchWrapper from '@app/_components/(dashboard)/general/refetch-wrapper';

const page = async ({ params }) => {
  const id = (await params).id;
  const t = await getTranslations();
  const locale = await getLocale();
  const direction = getLangDir(locale);

  const DataWrapper = async () => {
    let file;
    try {
      file = await fetchFileData(id);
    } catch (error) {
      const errorText = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILE_DATA_ERROR`,
      );
      return (
        <LoadErrorDiv>
          <LoadError>{errorText}</LoadError>
          <RefetchWrapper tag={`file${id}Data`} />
        </LoadErrorDiv>
      );
    }
    return (
      <>
        <FileDetails file={file} />
        <FileInfo id={id} lockType={'lock'} />
      </>
    );
  };

  const PathWrapper = async () => {
    let path;
    try {
      path = await fetchFilePath(id);
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
    return (
      <>
        <ToolBar path={path} views={false} id={id} type={'file'} />
        <FileSettingsModals
          id={id}
          name={path[0].name}
          filePage={true}
          parentFolderId={null}
        />
      </>
    );
  };

  return (
    <ViewProvider>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <PathWrapper />
        </Suspense>
      </ErrorBoundary>
      <div className="flex flex-col gap-24px">
        <div
          className={clsx(
            direction === 'ltr'
              ? 'xl:mr-[calc(var(--activitySpace))]'
              : 'xl:ml-[calc(var(--activitySpace))]',
            'font-content',
            'flex flex-col gap-24px',
          )}>
          {/* FILE P1 */}
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <DataWrapper />
            </Suspense>
          </ErrorBoundary>
          {/* FILE P2 */}

          {/* FILE P3 */}
          <FileVersions />
        </div>
        <ActivitySection type={'file'} id={id} />
      </div>
    </ViewProvider>
  );
};

export default page;

