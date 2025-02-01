import React from 'react';

const AccuracyLevel = ({ isModified = false, accuracy }) => {
  if (isModified) {
    return (
      <div className="bg-yellow-600 rounded-[16px] p-12px w-[180px] text-textLight">
        Modified
      </div>
    );
  }

  if (accuracy < 50) {
    return (
      <div className="bg-lowColor rounded-[16px] p-12px w-[180px] text-textLight">
        Not Accurate
      </div>
    );
  }

  return (
    <div className="bg-highColor rounded-[16px] p-12px w-[180px] text-textLight">
      Accurate
    </div>
  );
};

export default AccuracyLevel;

