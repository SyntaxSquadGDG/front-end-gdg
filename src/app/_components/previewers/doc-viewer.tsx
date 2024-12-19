'use client';
import React, { useState } from 'react';
import mammoth from 'mammoth';

const Docviewer = () => {
  const [htmlContent, setHtmlContent] = useState('');

  const handleFileRead = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const { value } = await mammoth.convertToHtml({ arrayBuffer });
    setHtmlContent(value);
  };

  return (
    <div>
      <input
        type="file"
        accept=".docx"
        onChange={(e) => handleFileRead(e.target.files[0])}
      />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default Docviewer;

