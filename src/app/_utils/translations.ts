export function getErrorText(t, error, fallback) {
  try {
    // Check if the translation exists for the error key
    const translatedError = t(error);

    // If the translated error matches the key (meaning it couldn't find the translation), use the fallback
    if (translatedError === error) {
      return t(fallback);
    }

    return translatedError;
  } catch (e) {
    // Return the fallback if there's an error or if the translation key doesn't exist
    return t(fallback);
  }
}

