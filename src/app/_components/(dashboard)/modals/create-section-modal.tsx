'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { contentFont } from '@/app/_utils/fonts'; // Assuming this is your font
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';
import Modal from './modal';
import toast from 'react-hot-toast';
import { fetcher } from '@/app/_utils/fetch';
import { revalidatePathAction } from '@/app/actions';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';

// Define a Zod schema for validation
const schema = z.object({
  sectionName: z
    .string()
    .min(2, '* Section name must be at least 2 characters'),
});

const CreateSectionModal = () => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
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

  // Handle form submission
  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://syntaxsquad.runasp.net/api/Sections/newsection?name=${data.sectionName}`,
        {
          method: 'POST',
        },
      );
      if (response.status === 404) throw new Error('Error');
      toast.success('Created');
      // handle form data (e.g., create a new section)
      await revalidatePathAction('/sections');
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
      isOpen={modalStack.includes('createSection')}
      onClose={closeModal}
      className={contentFont.className}>
      <h2 className="text-xl font-bold mb-[16px]">{t('sections.new')}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('sectionName')}
          type="text"
          placeholder="Enter Section Name"
          disabled={isLoading}
          className="w-[100%] py-[20px] rounded-[8px] px-[16px] border-[1px] border-solid border-blue1 outline-none mb-[16px]"
        />
        {errors.sectionName && (
          <p className="text-red-500 text-sm mb-[16px]">
            {errors.sectionName.message}
          </p>
        )}

        <input
          type="submit"
          disabled={isLoading}
          className={clsx(
            'w-[100%] py-[20px] rounded-[8px] px-[16px] bg-blue1 outline-none text-textLight',
            isLoading && 'bg-slate-500 cur',
          )}
        />
      </form>
    </Modal>
  );
};

export default CreateSectionModal;

