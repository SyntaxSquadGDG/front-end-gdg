'use client';
import AccuracyLevel from '@app/_components/(dashboard)/general/accuracy';
import { contentFont } from '@/app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  const t = useTranslations();
  const data = [
    {
      id: 1,
      path: 'HR SectionFolder1Folder9',
      accuracy: 30,
      name: 'Namee',
      type: 'pdf',
    },
    {
      id: 2,
      path: 'HR SectionFolder1Folder2',
      accuracy: 80,
      name: 'Name2',
      type: 'word',
    },
  ];
  return (
    // <div className={clsx('font-content')}>
    //   <div className="flex justify-between items-center mb-48px">
    //     <p className="text-22px font-medium">New Files (With AI)</p>
    //     <div className="flex gap-16px items-center">
    //       <button className="px-32px py-10px rounded-[10px] border-[1px] border-solid border-blue1">
    //         Confirm
    //       </button>
    //       <button className="px-32px py-10px rounded-[10px] bg-red-600 text-white">
    //         Cancel
    //       </button>
    //     </div>
    //   </div>
    //   <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
    //     <table
    //       className={clsx(
    //         'table-auto w-full min-w-[700px] border-collapse',
    //         'font-content',
    //         'table',
    //       )}>
    //       <thead className="rounded-[32px]">
    //         <tr className="border-b-solid border-b-tableBorder ">
    //           <td>Level</td>
    //           <td>File</td>
    //           <td>File Name</td>
    //           <td>Accuracy</td>
    //           <td>Path</td>
    //         </tr>
    //       </thead>
    //       <tbody className="">
    //         {data.map((file) => {
    //           return (
    //             <tr
    //               key={file.id}
    //               className="py-40px font-medium text-18px rounded-[32px]">
    //               <td>
    //                 <div className="flex items-center justify-center">
    //                   <AccuracyLevel accuracy={file.accuracy} />
    //                 </div>
    //               </td>
    //               <td>{file.name}</td>
    //               <td>{file.name}</td>
    //               <td>{file.accuracy}%</td>
    //               <td>{file.path}</td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <div className={clsx('font-content')}>
      <p>FONT1</p>
      <p className="font-regular">FONT1</p>
      <p className="font-[400]">FONT1</p>
    </div>
  );
};

export default Page;

