'use client';

import React from 'react';

const ImageViewer = ({ src }) => {
  const handleClick = () => {
    if (src) {
      const newTab = window.open();
      newTab.document.body.innerHTML = `<img src="${src}" style="height:100vh;" />`;
    }
  };

  return (
    <button onClick={handleClick}>
      <img src={src} className="rounded-[8px] overflow-hidden" alt="error" />
    </button>
  );
};

export default ImageViewer;

