/* eslint-disable @next/next/no-img-element */
'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import ImageModal from './image-modal';
import { useModal } from '@app/_contexts/modal-provider';
import { UpdatePersonalImage } from './data/updates';
import { revalidatePathAction } from '@app/actions';
import toast from 'react-hot-toast';
import { DeletePersonalImage } from './data/deletes';
import ErrorAction from '../general/error-action';
import { useMutation } from '@tanstack/react-query';
import { showErrorMessage } from '@app/_utils/fetch';
import DeleteUserImageModal from './delete-user-image-modal';
import DeleteModal from '../modals/delete-modal';

interface ImageUploadProps {
  initialImageUrl?: string; // Pass the current image URL as a prop
}

export default function ImageUpload({ initialImageUrl }: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(initialImageUrl || null);
  const [file, setFile] = useState<File | null>(null);

  const [errorDeleting, setErrorDeleting] = useState(null);
  const [errorUploading, setErrorUploading] = useState(null);

  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to reset the file input
  const t = useTranslations();
  const { openModal, closeModal, modalStack } = useModal();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Preview the new image
      };
      reader.readAsDataURL(selectedFile);
      openModal('personalImage'); // Open the modal when a file is selected
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setErrorUploading(null);
    updateImage.mutate(formData);
  };

  const handleDelete = async () => {
    setErrorDeleting(null);
    openModal('DeleteUserImage');
  };

  const updateImage = useMutation({
    mutationFn: (formData) => UpdatePersonalImage(formData),
    onSuccess: async () => {
      await revalidatePathAction('/profile');
      toast.success(t('profile.image.updatedSuccessfully'));
    },
    onError: (error) => {
      showErrorMessage(
        t,
        `profile.errors.${error?.message}`,
        `profile.errors.IMAGE_UPDATE_ERROR`,
        setErrorUploading,
        toast,
      );
    },
  });

  const deleteImage = useMutation({
    mutationFn: () => DeletePersonalImage(),
    onSuccess: async () => {
      await revalidatePathAction('/profile');
      toast.success(t('profile.image.deletedSuccessfully'));
    },
    onError: (error) => {
      showErrorMessage(
        t,
        `profile.errors.${error?.message}`,
        `profile.errors.IMAGE_DELETE_ERROR`,
        setErrorDeleting,
        toast,
      );
    },
  });

  const handleCancel = () => {
    setFile(null); // Clear the file selection
    setImage(initialImageUrl || null); // Revert image to the initial state
    setErrorUploading(null);
    setErrorDeleting(null);
    closeModal();
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input
    }
  };

  return (
    <div className="image-upload">
      <div className="flex items-center gap-24px">
        <div className="image-preview w-[80px] h-[80px] overflow-hidden rounded-full flex-shrink-0">
          {image ? (
            <img
              src={image}
              alt="Profile Preview"
              className="w-[80px] h-[80px] object-cover rounded-full cursor-pointer hover:opacity-70 duration-500"
              onClick={() => {
                const newTab = window.open();
                if (newTab) {
                  newTab.document.body.innerHTML = `<img src="${image}" style="height:100%">`;
                }
              }}
            />
          ) : (
            <p>{t('profile.image.noUploaded')}</p>
          )}
        </div>

        <div className="flex gap-8px items-center flex-wrap">
          <label
            htmlFor="fileInput"
            className={clsx(
              'cursor-pointer px-14px py-12px bg-mainColor1 rounded-[8px] text-12px text-textLight hover:opacity-70 duration-500',
              (updateImage.isPending || deleteImage.isPending) &&
                'opacity-50 cursor-default',
            )}>
            {updateImage.isPending
              ? t('profile.image.uploading')
              : t('profile.image.upload')}
          </label>

          <input
            id="fileInput"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            disabled={deleteImage.isPending || updateImage.isPending}
            onChange={handleImageChange}
            className="hidden" // Hide default file input
          />

          <button
            onClick={handleDelete}
            disabled={deleteImage.isPending || updateImage.isPending || !image}
            className="text-tertiaryButton text-14px p-12px rounded-md w-fit h-fit hover:opacity-70 duration-500">
            {deleteImage.isPending
              ? t('profile.image.deleting')
              : t('profile.image.delete')}
          </button>
        </div>
      </div>
      <ErrorAction>{errorDeleting}</ErrorAction>

      {/* Modal Popup */}
      <ImageModal
        file={file}
        handleCancel={handleCancel}
        handleUpload={handleUpload}
        image={image}
        loading={updateImage.isPending}
        errorUpload={errorUploading}
      />

      <DeleteModal
        error={errorDeleting}
        head={t('profile.image.removeImageDescription')}
        isDeleting={deleteImage.isPending}
        modalName={'DeleteUserImage'}
        onClick={deleteImage.mutate}
      />
    </div>
  );
}

