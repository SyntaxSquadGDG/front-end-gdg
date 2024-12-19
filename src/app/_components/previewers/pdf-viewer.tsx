'use client';
// Core viewer
import { Worker } from '@react-pdf-viewer/core';
import { Viewer, WorkerProps } from '@react-pdf-viewer/core';
import { ToolbarSlot, toolbarPlugin } from '@react-pdf-viewer/toolbar';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import React, { useState, useRef, useEffect } from 'react';

const PdfViewer = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  const [pageNumber, setPageNumber] = useState(1);
  const viewerRef = useRef<any>(null);
  const fileUrl = '/Sample-PDF.pdf';

  // Handle page change
  const goToNextPage = () => {
    if (viewerRef.current) {
      const nextPage = pageNumber + 1;
      setPageNumber(nextPage);
      viewerRef.current.jumpToPage(nextPage);
    }
  };

  const goToPreviousPage = () => {
    if (viewerRef.current) {
      const prevPage = pageNumber - 1;
      setPageNumber(prevPage);
      viewerRef.current.jumpToPage(prevPage);
    }
  };

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div
        className="rpv-core__viewer"
        style={{
          border: '1px solid rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
        {/* Fixed Toolbar */}
        <div
          style={{
            alignItems: 'center',
            backgroundColor: '#eeeeee',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            padding: '4px',
            position: 'sticky',
            top: 0,
            zIndex: 1000, // Make sure the toolbar is above the viewer content
          }}>
          <Toolbar>
            {(props: ToolbarSlot) => {
              const {
                CurrentPageInput,
                EnterFullScreen,
                GoToNextPage,
                GoToPreviousPage,
                NumberOfPages,
                Print,
                ShowSearchPopover,
                Zoom,
                ZoomIn,
                ZoomOut,
              } = props;
              return (
                <>
                  <div style={{ padding: '0px 2px' }}>
                    <ShowSearchPopover />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <ZoomOut />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <Zoom />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <ZoomIn />
                  </div>
                  <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                    <GoToPreviousPage />
                  </div>
                  <div style={{ padding: '0px 2px', width: '4rem' }}>
                    <CurrentPageInput />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    / <NumberOfPages />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <GoToNextPage />
                  </div>
                  <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                    <EnterFullScreen />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <Print />
                  </div>
                </>
              );
            }}
          </Toolbar>
        </div>

        {/* Viewer Content */}
        <div
          style={{
            height: '750px',
            overflow: 'auto',
          }}>
          <Viewer
            fileUrl={fileUrl}
            plugins={[toolbarPluginInstance]}
            ref={viewerRef}
            page={pageNumber}
          />
        </div>
      </div>
    </Worker>
  );
};

export default PdfViewer;

