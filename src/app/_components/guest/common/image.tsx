import React from 'react';

const ImageDiv = ({ src, children }) => {
  return (
    <div className="flex justify-center items-center w-[100%] relative">
      <img src={src} className="w-[auto] max-h-[80vh]" alt="" />
      {children}
    </div>
  );
};

export default ImageDiv;

