export const extendSelect = (array, label, value) => {
  return array.map((item) => ({
    ...item,
    label: item.label || item[label], // Only set 'label' if it's not already present
    value: item.value || item[value], // Only set 'value' if it's not already present
  }));
};

export const extendCustomSelect = (array, label1, label2, value) => {
  return array.map((item) => ({
    ...item,
    label: `${item[label1]} ${item[label2]}`, // Only set 'label' if it's not already present
    value: item.value || item[value], // Only set 'value' if it's not already present
  }));
};

