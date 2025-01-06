import SectionPage from '@/app/_components/(dashboard)/section-page/section-page';
import ActivitySection from '@app/_components/(dashboard)/activity-logs/activity-section';
import ErrorBoundary from '@app/_components/(dashboard)/general/error-boundary';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import { fetchSectionName } from '@app/_components/(dashboard)/sections/data/queires';
import SectionSettingsModals from '@app/_components/(dashboard)/sections/section-settings-modals';
import SectionViewWrapper from '@app/_components/(dashboard)/sections/section-view-wrapper';
import ToolBar from '@app/_components/navbars/toolbar';
import { ViewProvider } from '@app/_contexts/view-provider';
import { fetcher } from '@app/_utils/fetch/fetch';
import { getErrorText } from '@app/_utils/translations';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

const page = async ({ params }) => {
  const id = (await params).id;
  const t = await getTranslations();

  const PathWrapper = async () => {
    let path;
    try {
      const sectionName = await fetchSectionName(id);
      path = [{ name: sectionName.name, type: 'section', id: id }];
    } catch (error) {
      console.error('Error fetching employees:', error);
      const errorText = getErrorText(
        t,
        `sections.errors.${error?.message}`,
        `sections.errors.SECTION_PATH_ERROR`,
      );
      return <LoadError>{errorText}</LoadError>;
    }
    return (
      <>
        <ToolBar
          views={true}
          path={path}
          addFiles={false}
          type={'section'}
          id={id}
        />
        <SectionSettingsModals id={id} />
      </>
    );
  };

  const ViewsWrapper = async () => {
    let sectionName;
    try {
      sectionName = await fetchSectionName(id);
    } catch (error) {
      const errorText = getErrorText(
        t,
        `sections.errors.${error?.message}`,
        `sections.errors.SECTION_PATH_ERROR`,
      );
      return <LoadError>{errorText}</LoadError>;
    }
    return (
      <SectionViewWrapper id={id} sectionName={sectionName.name}>
        {/* <ActivitySection /> */}
      </SectionViewWrapper>
    );
  };

  return (
    <>
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
    </>
  );
};

export default page;

