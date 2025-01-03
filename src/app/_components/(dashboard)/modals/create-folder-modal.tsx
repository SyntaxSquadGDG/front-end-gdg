'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { contentFont } from '@/app/_utils/fonts'; // Assuming this is your font
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';
import Modal from './modal';
import toast from 'react-hot-toast';
import { fetcher } from '@app/_utils/fetch/fetch';
import { usePathname } from 'next/navigation';
import { revalidatePathAction } from '@/app/actions';
import { useState } from 'react';
import clsx from 'clsx';

// Define a Zod schema for validation
const schema = z.object({
  folderName: z.string().min(2, '* Folder name must be at least 2 characters'),
});

const CreateFolderModal = ({ type, id }) => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  const currentRoute = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  // Use React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  console.log('OPENED');

  // Handle form submission
  const onSubmit = async (data) => {
    console.log(data);

    try {
      setIsLoading(true);
      const response = await fetch(
        type === 'section'
          ? `http://syntaxsquad.runasp.net/api/Folders/newfolder?name=${data.folderName}&FolderParentId&SectionParentId=${id}`
          : `http://syntaxsquad.runasp.net/api/Folders/newfolder?name=${data.folderName}&FolderParentId=${id}&SectionParentId`,
        {
          method: 'POST',
        },
      );
      console.log(response);
      if (response.status === 404) throw new Error('Error');
      toast.success('Created');
      await revalidatePathAction(currentRoute);
      // handle form data (e.g., create a new folder)
      closeModal(); // Close modal after submitting
      reset();
    } catch (e) {
      toast.error('Error while Creating the section');
    } finally {
      setIsLoading(false);
    }
  };

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
          disabled={isLoading}
          className="w-[100%] py-[20px] rounded-[8px] px-[16px] border-[1px] border-solid border-blue1 outline-none mb-[16px]"
        />
        {errors.folderName && (
          <p className="text-red-500 text-sm mb-[16px]">
            {errors.folderName.message}
          </p>
        )}

        <input
          type="submit"
          disabled={isLoading}
          className={clsx(
            'w-[100%] py-[20px] rounded-[8px] px-[16px] bg-blue1 outline-none text-textLight',
            isLoading && 'bg-slate-400',
          )}
        />
      </form>
    </Modal>
  );
};

export default CreateFolderModal;

