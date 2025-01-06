import ActivitySection from '@app/_components/(dashboard)/activity-logs/activity-section';
import FileItem from '@app/_components/(dashboard)/files/file-item';
import Files from '@app/_components/(dashboard)/files/files';
import FoldersPage from '@app/_components/(dashboard)/folders-page/folders-page';
import {
  fetchFolderPath,
  fetchFolderSectionName,
} from '@app/_components/(dashboard)/folders/data/queries';
import FolderSettingsModals from '@app/_components/(dashboard)/folders/folder-settings-modals';
import FoldersViewWrapper from '@app/_components/(dashboard)/folders/folders-view-wrapper';
import ErrorBoundary from '@app/_components/(dashboard)/general/error-boundary';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import ToolBar from '@app/_components/navbars/toolbar';
import { HeightProvider } from '@app/_contexts/toolbar-height-provider';
import { ViewProvider } from '@app/_contexts/view-provider';
import { fetcher } from '@app/_utils/fetch/fetch';
import { getErrorText } from '@app/_utils/translations';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

const page = async ({ params }) => {
  const id = (await params).id;
  const t = await getTranslations();
  console.log(id);

  const PathWrapper = async () => {
    let path;
    try {
      path = await fetchFolderPath(id);
    } catch (error) {
      const errorText = getErrorText(
        t,
        `folders.errors.${error?.message}`,
        `folders.errors.FOLDER_PATH_ERROR`,
      );
      return <LoadError>{errorText}</LoadError>;
    }

    console.log(path);

    return (
      <>
        <ToolBar path={path} views={true} id={id} type={'folder'} />;
        <FolderSettingsModals id={id} name={path[0].name} />
      </>
    );
  };

  const ViewsWrapper = async () => {
    let path;
    try {
      path = await fetchFolderPath(id);
    } catch (error) {
      const errorText = getErrorText(
        t,
        `folders.errors.${error?.message}`,
        `folders.errors.FOLDER_PATH_ERROR`,
      );
      return <LoadError>{errorText}</LoadError>;
    }

    return (
      <FoldersViewWrapper
        id={id}
        sectionName={path[0].name}
        folderName={path.slice(-1)[0].name}>
        <ActivitySection />
      </FoldersViewWrapper>
    );
  };

  return (
    <HeightProvider>
      <ViewProvider>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <PathWrapper />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <ViewsWrapper />
          </Suspense>
        </ErrorBoundary>
      </ViewProvider>
    </HeightProvider>
  );
};

export default page;

