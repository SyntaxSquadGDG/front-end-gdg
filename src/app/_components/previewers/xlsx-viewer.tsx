// src/XlsxPreviewer.js
'use client';
import React, { useRef, useState, useEffect } from 'react';
import * as ExcelJS from 'exceljs';
import xlsxPreview from 'xlsx-preview';

const XlsxPreviewer = () => {
  const [fileContent, setFileContent] = useState(null);
  const [sheets, setSheets] = useState([]);
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  const [error, setError] = useState('');
  const previewRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (
      file &&
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        setFileContent(arrayBuffer);
        setError('');
      };

      reader.readAsArrayBuffer(file);
    } else {
      setError('Please upload a valid XLSX file.');
      setFileContent(null);
    }
  };

  useEffect(() => {
    const renderExcel = async () => {
      if (fileContent) {
        try {
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(fileContent);

          // Extract sheet names
          const sheetNames = workbook.worksheets.map((sheet) => sheet.name);
          setSheets(sheetNames);

          // Render the active sheet
          await renderSheet(0); // Render the first sheet by default
        } catch (err) {
          console.error('Error loading Excel document:', err);
          setError('Error loading Excel document');
        }
      }
    };

    renderExcel();
  }, [fileContent]);

  const renderSheet = async (index) => {
    if (fileContent && previewRef.current) {
      try {
        const options = {
          output: 'string',
          separateSheets: false,
          minimumRows: 20,
          minimumCols: 16,
        };

        // Convert the specified sheet to HTML
        const result = await xlsxPreview.xlsx2Html(fileContent, {
          ...options,
          separateSheets: true,
        });
        previewRef.current.innerHTML = result[index]; // Set the inner HTML of the container for the selected sheet
      } catch (err) {
        console.error('Error rendering Excel document:', err);
        setError('Error rendering Excel document');
      }
    }
  };

  const handleTabClick = (index) => {
    setActiveSheetIndex(index);
    renderSheet(index); // Render the selected sheet
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {sheets.length > 0 && (
        <div style={{ margin: '10px 0' }}>
          {sheets.map((sheet, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              style={{
                marginRight: '5px',
                padding: '5px',
                backgroundColor:
                  index === activeSheetIndex ? '#ccc' : '#f0f0f0',
              }}>
              {sheet}
            </button>
          ))}
        </div>
      )}
      <div
        ref={previewRef}
        id="container"
        style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}
      />
    </div>
  );
};

export default XlsxPreviewer;

