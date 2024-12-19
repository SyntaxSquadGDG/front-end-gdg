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

export function extractPath(elements) {
  let path = [];

  console.log(elements);

  // Reverse traverse the elements and construct the path
  for (let i = elements.length - 1; i >= 0; i--) {
    path.push(elements[i].name);
  }

  // Join the accumulated names to form the final path
  return path.join('/');
}

