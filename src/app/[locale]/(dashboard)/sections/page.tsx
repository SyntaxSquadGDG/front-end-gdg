import ActivitySection from '@app/_components/(dashboard)/activity-logs/activity-section';
import ErrorBoundary from '@app/_components/(dashboard)/general/error-boundary';
import SectionsViewWrapper from '@app/_components/(dashboard)/sections/sections-view-wrapper';
import ToolBar from '@app/_components/navbars/toolbar';
import { ViewProvider } from '@app/_contexts/view-provider';
import React from 'react';

const page = async () => {
  return (
    <ViewProvider>
      <ErrorBoundary>
        <ToolBar
          views={true}
          path={null}
          pathRequired={false}
          addFiles={true}
        />
      </ErrorBoundary>
      <SectionsViewWrapper>
        <ActivitySection />
      </SectionsViewWrapper>
    </ViewProvider>
  );
};

export default page;

