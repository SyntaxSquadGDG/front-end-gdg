export function decodeJWT(token) {
  // Split the token into its 3 parts
  const [header, payload, signature] = token.split('.');

  // Decode the header and payload (from Base64 URL encoding to Base64 standard)
  const decodeBase64 = (str) => {
    // Add the necessary padding for Base64 URL decoding
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return atob(str); // atob is a built-in browser function for Base64 decoding
  };

  // Decode both parts and parse them into JSON
  const decodedHeader = JSON.parse(decodeBase64(header));
  const decodedPayload = JSON.parse(decodeBase64(payload));

  return {
    header: decodedHeader,
    payload: decodedPayload,
    signature: signature, // Signature cannot be decoded
  };
}

