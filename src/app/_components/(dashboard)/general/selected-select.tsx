'use client';
import React from 'react';

const SelectedSelect = ({ items, keys, condition = true, handleChange }) => {
  return (
    <div className="mt-4">
      {condition && items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-500 text-white p-2 rounded">
              <div className="flex">
                {keys.map((key) => {
                  return <p key={key}>{item[key]}&nbsp;</p>;
                })}
              </div>
              <button
                type="button"
                onClick={() => handleChange(item)} // Deselect role
                className="ml-2 text-white font-bold">
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedSelect;

