import React from 'react';
import ItemIcon from '../general/item-icon';

const ActivityItem = ({ item }) => {
  return (
    <tr key={`${item.type}${item.id}`}>
      <td className="py-[16px]">
        <div className="flex items-center gap-[18px] justify-center">
          <span>
            <ItemIcon type={ItemIcon.type} />
          </span>
          <span>{item.name}</span>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center">{item.action}</div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          {item.lastModified}
        </div>
      </td>
    </tr>
  );
};

export default ActivityItem;

