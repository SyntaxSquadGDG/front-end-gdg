'use client';

import { useEffect, useRef, useState } from 'react';
import getPDFDocument from './_utils/get-pdf-document';
import createPDFPage from './_utils/create-pdf-page';
import renderPDFToCanvas from './_utils/render-pdf-to-canvas';

const PDFPreviewer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const renderPDF = async (pdfFile: File) => {
    // Convert the file to a URL that can be used by PDF.js
    const url = URL.createObjectURL(pdfFile);

    try {
      // Fetch the PDF
      const pdfDocument = await getPDFDocument(url);

      // Create a fragment to hold all pages
      const fragment = document.createDocumentFragment();

      // Loop through all the pages in the PDF
      for (
        let pageNumber = 1;
        pageNumber <= pdfDocument.numPages;
        pageNumber++
      ) {
        // Get the PDF page
        const pdfPage = await createPDFPage(pdfDocument, pageNumber);

        // Get the viewport of the page to extract sizes
        const viewport = pdfPage.getViewport({ scale: 1 });
        const { height, width } = viewport;

        // Create the canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        // Create a container for canvas and text layer
        const pageContainer = document.createElement('div');
        pageContainer.style.position = 'relative';
        pageContainer.style.marginBottom = '10px';
        pageContainer.appendChild(canvas);

        // Render the PDF to canvas and text layer
        await renderPDFToCanvas(pdfPage, canvas, pageContainer);

        // Append the container to the fragment
        fragment.appendChild(pageContainer);
      }

      // Add all rendered pages to the div element
      ref.current?.replaceChildren(fragment);
    } catch (error) {
      console.error('Error rendering PDF:', error);
    } finally {
      // Release the object URL to free memory
      URL.revokeObjectURL(url);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  useEffect(() => {
    if (file) {
      renderPDF(file);
    }
  }, [file]);

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <div ref={ref}></div>
    </div>
  );
};

export default PDFPreviewer;

