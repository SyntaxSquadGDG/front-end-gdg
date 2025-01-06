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
import { revalidatePathAction } from '@/app/actions';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSection } from '../sections/data/posts';
import { useRouter } from 'nextjs-toploader/app';
import { getErrorText } from '@app/_utils/translations';
import ErrorAction from '../general/error-action';

// Define a Zod schema for validation
const schema = z.object({
  sectionName: z
    .string()
    .min(2, '* Section name must be at least 2 characters'),
});

const CreateSectionModal = () => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  const [errorText, setErrorText] = useState(null);
  const queryClient = useQueryClient();
  const router = useRouter();

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
    mutationFn: (data) => createSection(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['sections']);
      router.push('/sections');
      reset();
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `sections.errors.${error?.message}`,
        `sections.errors.SECTION_CREATE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

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
          disabled={mutation.isPending}
          className="w-[100%] py-[20px] rounded-[8px] px-[16px] border-[1px] border-solid border-blue1 outline-none mb-[16px]"
        />
        {errors.sectionName && (
          <p className="text-red-500 text-sm mb-[16px]">
            {errors.sectionName.message}
          </p>
        )}

        <input
          type="submit"
          disabled={mutation.isPending}
          className={clsx(
            'w-[100%] py-[20px] rounded-[8px] px-[16px] bg-blue1 outline-none text-textLight',
            mutation.isPending && 'bg-slate-500 cur',
          )}
        />
      </form>
      <ErrorAction>{errorText}</ErrorAction>
    </Modal>
  );
};

export default CreateSectionModal;

