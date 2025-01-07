import { useState, useEffect } from 'react';
import { UpdateFileMetadata, updateFileMetadata } from './data/updates'; // Assuming this is your function to update file metadata
import Input from '../general/input';
import NormalSelect from '../general/normal-select';
import Checkbox from '../general/checkbox';
import Button from '../general/button';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { useBooleanValues } from '@app/_data/boolean';
import { useModal } from '@app/_contexts/modal-provider';
import { useMutation } from '@tanstack/react-query';
import { revalidatePathAction } from '@app/actions';
import { getErrorText } from '@app/_utils/translations';

export default function FileMetadataForm({
  fileId,
  folderMetadata = [],
  fileMetadata = [], // The current metadata of the file that will be pre-filled
  // onUpdateFileMetadata, // Callback to update file metadata (can be passed from parent)
}) {
  const [fields, setFields] = useState([]);
  const [errorText, setErrorText] = useState(null);
  const t = useTranslations();
  const { booleanOptions } = useBooleanValues();
  const { closeModal } = useModal();

  useEffect(() => {
    // Initialize fields with folder metadata and pre-fill them with file metadata
    const initialFields = folderMetadata.map((folderField) => {
      // Find the corresponding field in fileMetadata, if available
      const existingField = fileMetadata.find(
        (fileField) => fileField.name === folderField.name,
      );
      return {
        ...folderField,
        value: existingField ? existingField.value : '', // Pre-fill with value if it exists, else empty string
      };
    });
    setFields(initialFields);
  }, [folderMetadata, fileMetadata]);

  const handleChange = (name, key, value) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.name === name ? { ...field, [key]: value } : field,
      ),
    );
  };

  function cancel() {
    setFields([]);
    closeModal();
  }

  async function handleSendMetadata(data) {
    setErrorText(null);
    // Convert fields array into key-value object
    const metadataObject = fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {});

    mutation.mutate(metadataObject);
  }

  const mutation = useMutation({
    mutationFn: (data) => updateFileMetadata(fileId, data),
    onSuccess: async () => {
      await revalidatePathAction(`/files/${fileId}`);
      toast.success(t('files.metadataUpdated'));
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILE_METADATA_UPDATE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <div>
      <h2>Fill File Metadata</h2>
      {fields.map((field) => (
        <div key={field.id} className="flex gap-4 items-center mb-4">
          {/* Render the input fields dynamically based on the type */}
          {field.type === 'text' && (
            <Input
              label={field.name}
              value={field.value}
              isPending={mutation.isPending}
              onChange={(e) =>
                handleChange(field.name, 'value', e.target.value)
              }
              placeholder={`Enter ${field.name}`}
            />
          )}
          {field.type === 'number' && (
            <Input
              label={field.name}
              type="number"
              value={field.value}
              isPending={mutation.isPending}
              onChange={(e) =>
                handleChange(field.name, 'value', e.target.value)
              }
              placeholder={`Enter ${field.name}`}
            />
          )}
          {field.type === 'boolean' && (
            <NormalSelect
              options={booleanOptions}
              label={field.name}
              onChange={(value) => handleChange(field.name, 'value', value)}
              value={field.value}
              disabled={mutation.isPending}
            />

            // <Checkbox
            //   value={field.value}
            //   onChange={(value) => handleChange(field.name, 'value', value)}
            //   label={field.name}
            // />
          )}
          {field.type === 'date' && (
            <Input
              label={field.name}
              type="date"
              value={field.value}
              isPending={mutation.isPending}
              onChange={(e) =>
                handleChange(field.name, 'value', e.target.value)
              }
              placeholder={`Select ${field.name}`}
            />
          )}
          {/* You can add more types if needed */}
        </div>
      ))}
      <div className="flex gap-[8px]">
        <Button
          text={t('general.cancel')}
          disabled={mutation.isPending}
          onClick={cancel}
          variant="solid"
        />
        <Button
          isPendingText={t('general.updating')}
          text={t('general.update')}
          onClick={handleSendMetadata}
          isPending={mutation.isPending}
        />
      </div>
    </div>
  );
}

