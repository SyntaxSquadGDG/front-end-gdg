export const extendSelect = (array, labels, value) => {
  console.log(array);
  console.log(labels);
  if (!array) return [];
  return array.map((item) => {
    const label = labels
      .map((label) => item[label] || '') // Map over the label keys and get the value for each
      .filter(Boolean) // Filter out empty or falsy values
      .join(' '); // Join them with a space (or any other separator)

    return {
      ...item,
      label: label, // Set the dynamic label
      value: item.value || item[value], // Set 'value' if not already present
    };
  });
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

