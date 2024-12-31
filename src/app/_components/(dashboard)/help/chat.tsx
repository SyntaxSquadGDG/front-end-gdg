'use client';

import * as z from 'zod';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { convertToChatTime } from '@/app/_utils/formats';
import SendSVG from '@app/_components/svgs/chat/send';
import { useMessageSchema } from '@app/_schemas/message';
import { useLocale, useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import clsx from 'clsx';
import { contentFont } from '@app/_utils/fonts';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMessages } from './data/queries';
import LoadingSpinner from '../general/loader';
import { sendMessage } from './data/posts';
import toast from 'react-hot-toast';

const Chat = () => {
  const t = useTranslations();
  const locale = useLocale();
  const dir = getLangDir(locale);
  const messageSchema = useMessageSchema();
  const [isLoadingSending, setIsLoadingSending] = useState(false);
  const [errorSending, setErrorSending] = useState(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  const handleSuccessMessage = async (data) => {
    const sendData = {
      type: 'admin',
      time: Date.now(),
      content: data.message,
    };
    const res = await sendMessage(
      sendData,
      setIsLoadingSending,
      setErrorSending,
      handleSuccess,
      t,
      toast,
    );
  };

  const handleErrorMessage = (errors) => {
    console.log(errors);
  };

  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['messages'],
      refetchOnWindowFocus: false,
      queryFn: ({ pageParam = 1 }) => {
        return fetchMessages(pageParam, 5); // Fetch 5 messages per page
      },
      getNextPageParam: (lastPage, pages) => {
        const hasData = lastPage.length > 0;
        const isLastPage = !hasData || lastPage.length < 5;
        return hasData && !isLastPage ? pages.length + 1 : undefined;
      },
    });

  // Safely access messages after the data is fetched
  const messages = data?.pages?.flat() || [];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop < 25 && hasNextPage && !isFetching) {
      // If we're at the top of the container, fetch more messages
      fetchNextPage();
    }
  };

  async function handleSuccess() {
    await queryClient.invalidateQueries(['messages']);
  }

  async function handleSendMessage() {}

  return (
    <section
      className={clsx(
        'w-[100%] rounded-[16px] overflow-hidden border-[2px] border-solid border-mainColor1',
        contentFont.className,
      )}>
      <div className="flex justify-between py-[40px] px-[8px] xs:px-[32px] bg-mainColor1 text-textLight text-[20px] font-medium">
        <p>{t('help.support')}</p>
      </div>
      <div>
        <div
          className="px-[8px] xs:px-[32px] py-[30px] flex flex-col-reverse gap-5 h-[600px] overflow-y-auto overflow-x-hidden"
          ref={messagesContainerRef}
          onScroll={handleScroll}>
          {/* {isLoading && <LoadingSpinner />} */}
          {messages?.map((message) => (
            <div key={message.id} className="flex flex-col gap-[8px]">
              <div
                className={`flex w-fit gap-[16px] items-end ${
                  message.type === 'customer'
                    ? dir === 'rtl'
                      ? 'mr-auto'
                      : 'ml-auto'
                    : dir === 'rtl'
                    ? 'ml-auto'
                    : 'mr-auto'
                }`}>
                <div
                  className={`w-[48px] h-[48px] rounded-full overflow-hidden flex-shrink-0 sm:flex hidden ${
                    message.type === 'customer'
                      ? dir === 'rtl'
                        ? 'mr-auto order-2'
                        : 'ml-auto order-2'
                      : dir === 'rtl'
                      ? 'ml-auto'
                      : 'mr-auto'
                  }`}>
                  {message.type === 'customer' && (
                    <img src="/images/defaults/user.png" alt="" />
                  )}
                  {message.type !== 'customer' && (
                    <img src="/images/defaults/bot.png" alt="" />
                  )}
                </div>

                <div
                  className={`w-fit p-[24px] rounded-[16px] text-[16px] font-medium ${
                    message.type === 'customer'
                      ? dir === 'rtl'
                        ? 'mr-auto rounded-bl-none bg-mainColor1 text-textLight'
                        : 'ml-auto rounded-br-none bg-mainColor1 text-textLight'
                      : dir === 'rtl'
                      ? 'ml-auto rounded-br-none border-solid border-[1px] border-mainColor1 text-mainColor1'
                      : 'mr-auto rounded-bl-none border-solid border-[1px] border-mainColor1 text-mainColor1'
                  }`}>
                  {message.content}
                </div>
              </div>

              <p
                className={`w-fit text-textBodyPrimary text-[12px] ${
                  message.type === 'customer'
                    ? dir === 'rtl'
                      ? 'mr-auto'
                      : 'ml-auto'
                    : dir === 'rtl'
                    ? 'ml-auto'
                    : 'mr-auto'
                }`}>
                {convertToChatTime(message.time)}
              </p>
            </div>
          ))}
          {(isFetching || isLoading) && <LoadingSpinner />}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(handleSuccessMessage, handleErrorMessage)}
        className="py-[20px] px-[8px] xs:px-[32px] bg-mainColor1 flex sm:flex-row flex-col items-center gap-[8px] sm:gap-[40px]">
        <textarea
          disabled={isLoadingSending}
          id="chatMessage"
          {...register('message')}
          placeholder="Enter Your Message"
          className="resize-none w-[100%] h-[55px] overflow-y-auto rounded-[8px] xs:p-[14px] p-[1px] focus:outline-none text-mainColor1"
        />
        {/* {errors.message && (
          <p className="text-teal-400">{errors.message.message}</p>
        )} */}
        <button type="submit" disabled={isLoadingSending}>
          <SendSVG />
        </button>
      </form>
    </section>
  );
};

export default Chat;

