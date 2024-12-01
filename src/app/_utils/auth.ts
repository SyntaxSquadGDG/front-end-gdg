export function decodeJwtFromCookie(cookieName) {
  // Helper function to retrieve the value of a specific cookie by name
  function getCookieValue(name) {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
  }

  // Helper function to decode base64 strings
  function base64Decode(base64String) {
    const base64 = base64String.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join(''),
    );
    return JSON.parse(jsonPayload);
  }

  // Retrieve the JWT token from the cookie
  const token = getCookieValue(cookieName);
  if (!token) {
    throw new Error('JWT cookie not found or empty.');
  }

  // Decode the JWT token
  try {
    const [header, payload, signature] = token.split('.');
    if (!payload) {
      throw new Error('Invalid JWT structure.');
    }
    return base64Decode(payload);
  } catch (error) {
    throw new Error('Invalid JWT token.');
  }
}
