import { BASE_URL, SECOND_URL } from '@app/_components/_constants/fetch';

export const DeleteFile = async (
  id,
  setLoading,
  setError,
  onDeleteSuccess,
  t,
  toast,
) => {
  setLoading(true);
  setError(null);
  let errorText;

  try {
    const response = await fetch(
      `${SECOND_URL}/Sfiles/deleteById?fileid=${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('DELETE');
    }

    const result = await response.json();
    await onDeleteSuccess();
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

export const DeleteFileVersion = async (
  fileId,
  versionId,
  setLoading,
  setError,
  onDeleteSuccess,
  t,
  toast,
) => {
  setLoading(true);
  setError(null);
  let errorText;

  console.log(versionId);

  try {
    const response = await fetch(`${BASE_URL}/versions/${versionId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('VERSION_DELETE');
    }

    const result = await response.json();
    await onDeleteSuccess();
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

