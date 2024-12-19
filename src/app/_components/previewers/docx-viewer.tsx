// src/DocxPreviewer.js
'use client';
import React, { useRef, useState, useEffect } from 'react';
import { renderAsync } from 'docx-preview'; // Import renderAsync function from docx-preview

const DocxPreviewer = () => {
  const [fileContent, setFileContent] = useState(null);
  const [error, setError] = useState('');
  const previewRef = useRef(null);

  // Static URL for testing
  // const staticUrl =
  //   'https://products.groupdocs.app/viewer/app/?lang=en&file=0b11195d-f7f1-499f-891d-815861832eef%2FDocument_Digitization_Proposal_Updated%20(1).docx'; // Replace with your actual DOCX file URL

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (
      file &&
      file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        // Set the file content as an ArrayBuffer
        setFileContent(arrayBuffer);
        setError('');
      };

      reader.readAsArrayBuffer(file);
    } else {
      setError('Please upload a valid DOCX file.');
      setFileContent(null);
    }
  };

  // const fetchDocxFromStaticUrl = async () => {
  //   try {
  //     const response = await fetch(staticUrl);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const arrayBuffer = await response.arrayBuffer();
  //     setFileContent(arrayBuffer);
  //     setError('');
  //   } catch (error) {
  //     console.error('Error fetching document:', error);
  //     setError('Error fetching document');
  //   }
  // };

  useEffect(() => {
    if (fileContent && previewRef.current) {
      // Render the DOCX content into the div
      renderAsync(fileContent, previewRef.current)
        .then(() => {
          console.log('docx: finished');
        })
        .catch((err) => {
          console.error('Error rendering document:', err);
          setError('Error rendering document');
        });
    }

    console.log(fileContent);
  }, [fileContent]);

  return (
    <div>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      {/* <button onClick={fetchDocxFromStaticUrl} style={{ marginTop: '10px' }}>
        Fetch DOCX from Static URL
      </button> */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div ref={previewRef} id="container" style={{ marginTop: '20px' }} />
      {/* Optional: Add a divider */}
      <div style={{ width: '100%', height: '20px', backgroundColor: 'red' }} />
    </div>
  );
};

export default DocxPreviewer;

