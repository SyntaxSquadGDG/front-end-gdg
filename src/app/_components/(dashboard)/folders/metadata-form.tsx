import { useState } from 'react';
import { createFolderMetadata } from './data/posts';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModal } from '@app/_contexts/modal-provider';
import toast from 'react-hot-toast';
import { updateFolderMetadata } from './data/updates';
import Input from '../general/input';
import NormalSelect from '../general/normal-select';
import Checkbox from '../general/checkbox';
import DeleteSVG from '@app/_components/svgs/permissions/delete';
import Button from '../general/button';
import Add2SVG from '@app/_components/svgs/general/add2';
import { v4 as uuidv4 } from 'uuid';
import { getErrorText } from '@app/_utils/translations';
import ErrorAction from '../general/error-action';

export default function MetadataForm({ id, initialFields = [] }) {
  const [fields, setFields] = useState(
    initialFields.map((field) => ({ ...field, id: field.id || uuidv4() })),
  );
  const [errorText, setErrorText] = useState(null);
  const t = useTranslations();
  const queryClient = useQueryClient();
  const mode = initialFields.length > 0 ? 'update' : 'create';
  const pendingText =
    mode === 'create' ? t('general.creating') : t('general.updating');
  const buttonText =
    mode === 'create' ? t('general.create') : t('general.update');

  const { closeModal } = useModal();

  const addField = () => {
    setFields([
      ...fields,
      { id: uuidv4(), name: '', type: 'text', required: false },
    ]);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index, key, value) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, [key]: value } : field,
    );
    setFields(updatedFields);
  };

  const saveMetadata = async () => {
    const trimmedFields = fields.map((field) => ({
      ...field,
      name: field.name.trim(),
    }));
    const hasEmptyField = trimmedFields.some((field) => !field.name);
    if (hasEmptyField) {
      setErrorText(t('folders.errors.METADATA_KEY_EMPTY'));
      return;
    }

    const nameSet = new Set();
    const hasDuplicate = trimmedFields.some((field) => {
      if (nameSet.has(field.name)) {
        return true;
      }
      nameSet.add(field.name);
      return false;
    });

    if (hasDuplicate) {
      setErrorText(t('folders.errors.METADATA_KEY_DUPLICATE'));
      return;
    }

    const metadataObject = Object.fromEntries(
      fields.map((field) => [field.name, field.type]),
    );

    metadataMutation.mutate(metadataObject);
  };

  function cancel() {
    setFields(initialFields);
    setErrorText(null);
    closeModal();
  }

  const options = [
    { label: t('types.text'), value: 'text' },
    { label: t('types.number'), value: 'number' },
    { label: t('types.boolean'), value: 'boolean' },
    { label: t('types.date'), value: 'date' },
  ];

  const metadataMutation = useMutation({
    mutationFn: (data) =>
      initialFields.length === 0
        ? createFolderMetadata(id, data)
        : updateFolderMetadata(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['folderMetadata', id]);
      toast.success(
        initialFields.length === 0
          ? t('folders.metadataCreated')
          : t('folders.metadataUpdated'),
      );
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `folders.errors.${error?.message}`,
        initialFields.length === 0
          ? `folders.errors.CREATE_METADATA_ERROR`
          : `folders.errors.UPDATE_METADATA_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <div>
      <h2>Metadata Fields</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-center">
          <Input
            placeHolder={t('folders.metadataFieldNamePlaceholder')}
            isPending={metadataMutation.isPending}
            type="text"
            value={field.name}
            onChange={(e) => updateField(index, 'name', e.target.value)}
          />
          <NormalSelect
            options={options}
            value={field.type}
            disabled={metadataMutation.isPending}
            onChange={(value) => updateField(index, 'type', value)}
          />
          <Checkbox
            onChange={(checked) => updateField(index, 'required', checked)}
            value={field.required}
            disabled={metadataMutation.isPending}
            label={t('general.required')}
          />
          <button
            onClick={() => removeField(index)}
            disabled={metadataMutation.isPending}
            className=" text-white px-2">
            <DeleteSVG />
          </button>
        </div>
      ))}
      <Button
        SVG={Add2SVG}
        text={t('folders.metadataAddField')}
        disabled={metadataMutation.isPending}
        onClick={addField}
        variant="outline"
      />
      <div className="flex gap-[8px]">
        <Button
          text={t('general.cancel')}
          disabled={metadataMutation.isPending}
          onClick={cancel}
          variant="solid"
        />
        <Button
          isPendingText={pendingText}
          text={buttonText}
          onClick={saveMetadata}
          disabled={mode === 'create' && fields.length === 0}
          isPending={metadataMutation.isPending}
        />
      </div>
      <ErrorAction>{errorText}</ErrorAction>
    </div>
  );
}

