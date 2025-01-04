import { BASE_URL } from '@app/_components/_constants/fetch';

export const RestoreFileVersion = async (
  fileId,
  versionId,
  setLoading,
  setError,
  onSuccess,
  t,
  toast,
) => {
  setLoading(true);
  setError(null);
  let errorText;

  console.log(versionId);

  try {
    const response = await fetch(`${BASE_URL}/versions/${versionId}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('RESTORE_ERROR');
    }

    const result = await response.json();
    await onSuccess();
    return result;
  } catch (error) {
    errorText = t(`files.errors.${error.message}`);
    toast.error(errorText);
    setError(errorText);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  } finally {
    setLoading(false);
  }
};

export const UploadNewVersion = async (
  fileId,
  setLoading,
  setError,
  onSuccess,
  t,
  toast,
) => {
  setLoading(true);
  setError(null);
  let errorText;

  try {
    const response = await fetch(`${BASE_URL}/versions`, {
      method: 'GET',
    });

    if (!response.ok) {
      console.log(response);
      throw new Error('VERSION_NEW_ERROR');
    }

    const result = await response.json();
    await onSuccess();
    return result;
  } catch (error) {
    errorText = t(`files.errors.${error.message}`);
    toast.error(errorText);
    setError(errorText);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  } finally {
    setLoading(false);
  }
};

export const LockFile = async (
  fileId,
  type,
  setLoading,
  setError,
  onSuccess,
  t,
  toast,
) => {
  setLoading(true);
  setError(null);
  let errorText;

  try {
    const response = await fetch(`${BASE_URL}/versions`, {
      method: 'GET',
    });

    if (!response.ok) {
      console.log(response);
      if (type === 'lock') {
        throw new Error('LOCK_ERROR');
      }
      throw new Error('UNLOCK_ERROR');
    }

    const result = await response.json();
    await onSuccess();
    return result;
  } catch (error) {
    errorText = t(`files.errors.${error.message}`);
    toast.error(errorText);
    setError(errorText);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  } finally {
    setLoading(false);
  }
};

