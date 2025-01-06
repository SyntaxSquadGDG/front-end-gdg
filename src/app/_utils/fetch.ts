import { BASE_URL, SECOND_URL } from '@app/_constants/fetch';
import { getCookie } from 'cookies-next';
import { getErrorText } from './translations';

export async function fetchData(
  query,
  method = 'GET',
  body = null,
  headersOptions = {},
  nextConfig = {},
) {
  const token = getCookie('token');

  // Define headers and remove 'Content-Type' if body is FormData
  const headers = {
    Authorization: `Bearer ${token}`,
    ...headersOptions,
  };

  // If body is JSON, set Content-Type explicitly
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const options = {
    method,
    headers,
    ...nextConfig,
  };

  // Add body for non-GET requests
  if (method !== 'GET' && body) {
    options.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${query}`, options);

    if (!response.ok) {
      let errorResponse = 'DEFAULT';
      try {
        const responseError = await response.json();
        errorResponse = responseError?.error;
      } finally {
        throw new Error(errorResponse);
      }
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
}

export const getNextPage = (lastPage, pages, paginationPageLimit) => {
  const hasData = lastPage.length > 0;
  const isLastPage = !hasData || lastPage.length < paginationPageLimit;
  return hasData && !isLastPage ? pages.length + 1 : undefined;
};

export const showErrorMessage = (t, initial, fallback, setErrorText, toast) => {
  const textError = getErrorText(t, initial, fallback);
  setErrorText(textError);
  toast.error(textError);
};

export async function fetchData2(
  query,
  method = 'GET',
  body = null,
  headersOptions = {},
  nextConfig = {},
) {
  const token = getCookie('token');

  // Define headers and remove 'Content-Type' if body is FormData
  const headers = {
    Authorization: `Bearer ${token}`,
    ...headersOptions,
  };

  // If body is JSON, set Content-Type explicitly
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const options = {
    method,
    headers,
    ...nextConfig,
  };

  // Add body for non-GET requests
  if (method !== 'GET' && body) {
    options.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${SECOND_URL}${query}`, options);

    if (!response.ok) {
      let errorResponse = 'DEFAULT';
      try {
        const responseError = await response.json();
        errorResponse = responseError?.error;
      } finally {
        throw new Error(errorResponse);
      }
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
}

export async function fetchBlob(
  query,
  method = 'GET',
  body = null,
  headersOptions = {},
  nextConfig = {},
) {
  const token = getCookie('token');

  // Define headers and remove 'Content-Type' if body is FormData
  const headers = {
    Authorization: `Bearer ${token}`,
    ...headersOptions,
  };

  // If body is JSON, set Content-Type explicitly
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const options = {
    method,
    headers,
    ...nextConfig,
  };

  // Add body for non-GET requests
  if (method !== 'GET' && body) {
    options.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${query}`, options);

    if (!response.ok) {
      let errorResponse = 'DEFAULT';
      try {
        const responseError = await response.json();
        errorResponse = responseError?.error;
      } finally {
        throw new Error(errorResponse);
      }
    }

    return await response.blob();
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
}

