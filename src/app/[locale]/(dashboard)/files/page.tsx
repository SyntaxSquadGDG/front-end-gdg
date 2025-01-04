import AllFiles from '@app/_components/(dashboard)/files/all-files';
import ToolBar from '@app/_components/navbars/toolbar';
import { ViewProvider } from '@app/_contexts/view-provider';
import React from 'react';

const page = () => {
  return (
    <ViewProvider>
      <ToolBar
        path={null}
        addFiles={false}
        views={true}
        id={null}
        viewOnly={true}
        pathRequired={false}
        type={'file'}
      />
      <AllFiles />
    </ViewProvider>
  );
};

export default page;

