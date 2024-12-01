'use client';
import EmailSVG from '@/app/_components/svgs/auth/email';
import PasswordSVG from '@/app/_components/svgs/auth/password';
import { contentFont, headFont } from '@/app/_utils/fonts';
import clsx from 'clsx';
import { setCookie } from 'cookies-next';
import React from 'react';

const page = () => {
  return (
    <div
      className={clsx(
        'bg-[#18223F] bg-cover min-h-[100vh] flex items-center justify-center relative text-textLight',
        contentFont.className,
      )}>
      <div
        className={
          "absolute inset-0 bg-[url('/images/patterns/guest.png')] bg-cover bg-no-repeat mix-blend-multiply z-0 rounded-bl-[40px] rounded-br-[40px]"
        }
      />

      <div className="container mx-auto py-[48px] relative z-5">
        <div className="bg-gradient-to-b from-[#FFFFFF11] to-transparent flex items-center gap-[64px] lg:flex-row flex-col p-[48px] rounded-[30px]">
          <div className="w-[100%] flex items-center justify-center">
            <img src="/images/auth/bot.png" alt="" />
          </div>
          <div className="flex flex-col gap-[24px] w-[100%]">
            <p
              className={clsx(
                headFont.className,
                'font-bold text-[24px] text-[#CDAD8F]',
              )}>
              Welcome To Syntax Squad!
            </p>
            <div className="flex flex-col gap-[16px]">
              <label htmlFor="email">Email</label>

              <div className="rounded-[16px] py-[20px] px-[12px] flex gap-[8px] items-center border-[1px] border-solid border-[#CDAD8F]">
                <EmailSVG />
                <input
                  type="text"
                  className="w-[100%] outline-none bg-transparent"
                  placeholder="Enter your email"
                  id="email"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[16px]">
              <label htmlFor="password">Password</label>
              <div className="rounded-[16px] py-[20px] px-[12px] flex gap-[8px] items-center border-[1px] border-solid border-[#CDAD8F]">
                <PasswordSVG />
                <input
                  type="password"
                  className="w-[100%] outline-none bg-transparent"
                  placeholder="Enter your password"
                  id="password"
                />
              </div>
            </div>

            <input
              type="submit"
              value="login"
              className="bg-[#CDAD8F] rounded-[16px] px-[24px] py-[20px] w-[100%] font-bold  text-black"
              onClick={() =>
                setCookie(
                  'token',
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

