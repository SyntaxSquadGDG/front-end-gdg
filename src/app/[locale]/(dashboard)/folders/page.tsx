import AllFolders from '@app/_components/(dashboard)/folders/all-folders';
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
        type={'folder'}
      />
      <AllFolders />
    </ViewProvider>
  );
};

export default page;

