'use client';

import React from 'react';
import FileIcon from '../general/file-icon';

const ActivityTableItem = ({ activity }) => {
  return (
    <tr key={activity.id}>
      <td>
        <div className="w-[36px] h-[36px] shrink-0">
          <img src="/images/defaults/user.png" alt="" />
        </div>
      </td>
      <td>
        {activity.firstName} {activity.lastName}
      </td>
      <td>{activity.action}</td>
      <td>
        <div className="flex items-center gap-[18px] justify-center">
          <span>
            <FileIcon type={activity.type} />
            {/* {activity.type === 'section' && <SectionItemPermissionSVG />}
            {activity.type === 'folder' && <FolderItemPermissionSVG />}
            {activity.type === 'file' && <FileItemPermissionSVG />} */}
          </span>
          <span>{activity.name}</span>
        </div>
      </td>
      <td>{activity.lastModified}</td>
    </tr>
  );
};

export default ActivityTableItem;

