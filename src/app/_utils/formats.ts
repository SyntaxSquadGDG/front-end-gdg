export function formatDate(date) {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = new Date(date).toLocaleDateString('en-GB', options);

  return formattedDate.replace(',', ''); // Remove the default comma and return the formatted string
}

export function formatDateWithTime(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error('Invalid Date object');
  }

  // Extract date components
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  // Extract time components
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Format the string
  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

try {
  console.log(formatDate(new Date())); // Valid input
  console.log(formatDate('invalid')); // Invalid input, throws error
} catch (error) {
  console.error(error.message);
}

export function formatDateWithTimeStamp(timestamp) {
  // Convert timestamp to Date object
  const date = new Date(timestamp);

  // Check if the resulting Date object is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid timestamp or Date object');
  }

  // Extract date components
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  // Extract time components
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Format the string
  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

