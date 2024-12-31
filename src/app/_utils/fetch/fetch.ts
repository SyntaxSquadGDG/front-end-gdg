// // lib/fetcher.js
// export async function fetcher(url, options = {}) {
//   // const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
//   const baseUrl = 'http://syntaxsquad.runasp.net/api';

//   try {
//     const { next, ...fetchOptions } = options; // Extract Next.js-specific options for GET
//     const isGetRequest =
//       !fetchOptions.method || fetchOptions.method.toUpperCase() === 'GET';

//     const response = await fetch(`${baseUrl}${url}`, {
//       ...fetchOptions,
//       ...(isGetRequest && { next }), // Only include `next` for GET requests
//       headers: {
//         'Content-Type': 'application/json',
//         ...fetchOptions.headers,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} - ${response.statusText}`);
//     }

//     // Return JSON response, handle empty responses for methods like DELETE
//     return response.status !== 204 ? await response.json() : null;
//   } catch (error) {
//     console.error('Fetch error:', error.message);
//     throw error;
//   }
// }

// export const BASE_URL = 'http://localhost:5000/api/';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// lib/fetcher.ts
export async function fetcher(url: string, options: any = {}) {
  // const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const baseUrl = 'http://syntaxsquad.runasp.net/api';

  try {
    const { next, body, ...fetchOptions } = options;
    const isGetRequest =
      !fetchOptions.method || fetchOptions.method.toUpperCase() === 'GET';

    // Handle method types and decide whether to include body or not
    const requestOptions: RequestInit = {
      method: fetchOptions.method || 'GET', // Default to GET if no method is specified
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      ...(!isGetRequest && body && { body: JSON.stringify(body) }), // Only include body if method is not GET
      ...(isGetRequest && { next }), // For GET requests, include the revalidation next property
    };

    const response = await fetch(`${baseUrl}${url}`, requestOptions);

    // If response status is not OK, throw an error
    if (!response.ok) {
      const errorMessage = `HTTP Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    // If successful and status is not 204 (No Content), return JSON
    return response.status !== 204 ? await response.json() : null;
  } catch (error: any) {
    // Handle network errors or other unexpected errors
    console.error('Fetcher Error:', error.message || error);
    throw new Error(`Failed to fetch from ${url}: ${error.message}`);
  }
}

