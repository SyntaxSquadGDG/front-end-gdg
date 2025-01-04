import { useState } from 'react';
import { CreateFolderMetadata } from './data/posts';
import { useTranslations } from 'next-intl';
import { useQueryClient } from '@tanstack/react-query';
import { useModal } from '@app/_contexts/modal-provider';
import toast from 'react-hot-toast';
import { UpdateFolderMetadata } from './data/updates';
import Input from '../general/input';
import NormalSelect from '../general/normal-select';
import Checkbox from '../general/checkbox';
import DeleteSVG from '@app/_components/svgs/permissions/delete';
import Button from '../general/button';
import Add2SVG from '@app/_components/svgs/general/add2';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

export default function MetadataForm({ id, initialFields = [] }) {
  const [fields, setFields] = useState(
    initialFields.map((field) => ({ ...field, id: field.id || uuidv4() })),
  );
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const queryClient = useQueryClient();
  const mode = initialFields.length > 0 ? 'update' : 'create';
  const pendingText =
    mode === 'create' ? t('general.creating') : t('general.updating');
  const buttonText =
    mode === 'create' ? t('general.create') : t('general.update');

  const { closeModal } = useModal();

  // Add a new metadata field
  const addField = () => {
    setFields([
      ...fields,
      { id: uuidv4(), name: '', type: 'text', required: false },
    ]);
  };

  // Remove a metadata field
  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  // Update field values
  const updateField = (index, key, value) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, [key]: value } : field,
    );
    setFields(updatedFields);
  };

  async function onSuccess() {
    await queryClient.invalidateQueries(['folderMetadata', id]);
    setError(null);
    setIsLoading(false);
    closeModal();
    if (mode === 'create') {
      toast.success(t('folders.success.METADATA_CREATE'));
    } else {
      toast.success(t('folders.success.METADATA_UPDATE'));
    }
  }

  // Save metadata (POST for create, PUT for update)
  const saveMetadata = async () => {
    const trimmedFields = fields.map((field) => ({
      ...field,
      name: field.name.trim(),
    }));
    const hasEmptyField = trimmedFields.some((field) => !field.name);
    if (hasEmptyField) {
      setError(t('folders.errors.METADATA_KEY_EMPTY'));
      return;
    }

    const nameSet = new Set();
    const hasDuplicate = trimmedFields.some((field) => {
      if (nameSet.has(field.name)) {
        return true; // Duplicate found
      }
      nameSet.add(field.name);
      return false;
    });

    if (hasDuplicate) {
      setError(t('folders.errors.METADATA_KEY_DUPLICATE'));
      return; // Stop execution
    }

    const data = {
      folderId: id,
      fields: fields,
    };

    if (mode === 'create') {
      await CreateFolderMetadata(
        data,
        setIsLoading,
        setError,
        onSuccess,
        t,
        toast,
      );
    } else {
      await UpdateFolderMetadata(
        data,
        setIsLoading,
        setError,
        onSuccess,
        t,
        toast,
      );
    }
  };

  function cancel() {
    setFields(initialFields);
    setIsLoading(false);
    setError(null);
    closeModal();
  }

  const options = [
    {
      label: t('types.text'),
      value: 'text',
    },
    {
      label: t('types.number'),
      value: 'number',
    },
    {
      label: t('types.boolean'),
      value: 'boolean',
    },
    {
      label: t('types.date'),
      value: 'date',
    },
  ];

  return (
    <div>
      <h2>Metadata Fields</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-center">
          <Input
            placeHolder={t('folders.metadataFieldNamePlaceholder')}
            isPending={isLoading}
            type="text"
            value={field.name}
            onChange={(e) => updateField(index, 'name', e.target.value)}
          />
          <NormalSelect
            options={options}
            value={field.type}
            disabled={isLoading}
            onChange={(value) => updateField(index, 'type', value)}
          />
          <Checkbox
            onChange={(checked) => updateField(index, 'required', checked)}
            value={field.required}
            disabled={isLoading}
            label={t('general.required')}
          />
          <button
            onClick={() => removeField(index)}
            disabled={isLoading}
            className=" text-white px-2">
            <DeleteSVG />
          </button>
        </div>
      ))}
      <Button
        SVG={Add2SVG}
        text={t('folders.metadataAddField')}
        disabled={isLoading}
        onClick={addField}
        variant="outline"
      />
      <div className="flex gap-[8px]">
        <Button
          text={t('general.cancel')}
          disabled={isLoading}
          onClick={cancel}
          variant="solid"
        />
        <Button
          isPendingText={pendingText}
          text={buttonText}
          onClick={saveMetadata}
          disabled={mode === 'create' && fields.length === 0}
          isPending={isLoading}
        />
      </div>
      {error && error}
    </div>
  );
}

