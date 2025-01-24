'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { contentFont } from '@/app/_utils/fonts'; // Assuming this is your font
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';
import Modal from './modal';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { revalidatePathAction } from '@/app/actions';
import { useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'nextjs-toploader/app';
import { getErrorText } from '@app/_utils/translations';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createFolderToFolder,
  createFolderToSection,
} from '../folders/data/posts';
import ErrorAction from '../general/error-action';

// Define a Zod schema for validation
const schema = z.object({
  folderName: z.string().min(2, '* Folder name must be at least 2 characters'),
});

const CreateFolderModal = ({ type, id }) => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  const currentRoute = usePathname();
  const [errorText, setErrorText] = useState(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const parentSection = type === 'section';

  // Use React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    setErrorText(null);
    mutation.mutate(data);
  }

  function onError() {}

  const mutation = useMutation({
    mutationFn: (data) =>
      parentSection
        ? createFolderToSection(id, data)
        : createFolderToFolder(id, data),
    onSuccess: async () => {
      // await revalidatePathAction(currentRoute);
      if (parentSection) {
        await queryClient.invalidateQueries(['sections']);
      }
      await queryClient.invalidateQueries(['folders', id]);
      toast.success(t('folders.created'));
      reset();
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `folders.errors.${error?.message}`,
        `folders.errors.FOLDER_CREATE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <Modal
      isOpen={modalStack.includes('createFolder')}
      onClose={closeModal}
      className={contentFont.className}>
      <h2 className="text-xl font-bold mb-[16px]">{t('folders.new')}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('folderName')}
          type="text"
          placeholder="Enter Folder Name"
          disabled={mutation.isPending}
          className="w-[100%] py-[20px] rounded-[8px] px-[16px] border-[1px] border-solid border-blue1 outline-none mb-[16px]"
        />
        {errors.folderName && (
          <p className="text-red-500 text-sm mb-[16px]">
            {errors.folderName.message}
          </p>
        )}

        <input
          type="submit"
          disabled={mutation.isPending}
          className={clsx(
            'w-[100%] py-[20px] rounded-[8px] px-[16px] bg-blue1 outline-none text-textLight',
            mutation.isPending && 'bg-slate-400',
          )}
        />
      </form>
      <ErrorAction>{errorText}</ErrorAction>
    </Modal>
  );
};

export default CreateFolderModal;

