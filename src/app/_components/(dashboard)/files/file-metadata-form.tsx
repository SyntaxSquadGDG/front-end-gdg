import { useState, useEffect } from 'react';
import { UpdateFileMetadata } from './data/updates'; // Assuming this is your function to update file metadata
import Input from '../general/input';
import NormalSelect from '../general/normal-select';
import Checkbox from '../general/checkbox';
import Button from '../general/button';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { useBooleanValues } from '@app/_data/boolean';
import { useModal } from '@app/_contexts/modal-provider';

export default function FileMetadataForm({
  folderMetadata = [],
  fileMetadata = [], // The current metadata of the file that will be pre-filled
  onUpdateFileMetadata, // Callback to update file metadata (can be passed from parent)
}) {
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const saveMetadata = async () => {
    try {
      const updatedFileMetadata = fields.map(
        ({ id, value, type, required }) => ({
          id,
          value,
          type,
          required,
        }),
      );

      console.log(updatedFileMetadata);
      // Call the callback or the function to update the file metadata
      // await onUpdateFileMetadata(updatedFileMetadata);
      toast.success('Metadata updated successfully!');
    } catch (error) {
      toast.error('Failed to update metadata!');
    }
  };

  function cancel() {
    setFields([]);
    closeModal();
  }

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
              isPending={isLoading}
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
              isPending={isLoading}
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
              disabled={isLoading}
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
              isPending={isLoading}
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
          disabled={isLoading}
          onClick={cancel}
          variant="solid"
        />
        <Button
          isPendingText={t('general.updating')}
          text={t('general.update')}
          onClick={saveMetadata}
          isPending={isLoading}
        />
      </div>
    </div>
  );
}

