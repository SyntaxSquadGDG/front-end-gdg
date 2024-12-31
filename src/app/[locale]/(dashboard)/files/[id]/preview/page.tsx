import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import ImageViewer from '@app/_components/previewers/image-viewer';
import MarkdownRenderer from '@app/_components/previewers/markdown-preview';
import { fetcher } from '@app/_utils/fetch/fetch';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const page = async ({ params }) => {
  const id = (await params).id;
  let data;
  let file;
  let path;

  try {
    data = await fetcher(`/sfiles/filebyidpreview?fileid=${id}`, {
      next: { revalidate: 0, tags: ['filePreview', id] },
    });
    console.log('DATA IS ');
    console.log(data);
  } catch (e) {
    console.log(e);
  } finally {
  }

  try {
    file = await fetcher(`/Sfiles/filebyid?fileid=${id}`, {
      next: { revalidate: 0, tags: ['fileId', id] },
    });
    console.log(data);
  } catch (e) {
    console.log(e);
  } finally {
  }

  try {
    path = await fetcher(`/Sfiles/Path/${id}`, {
      next: { revalidate: 0, tags: ['filepath', id] },
    });
  } catch (e) {
    console.log(e);
  } finally {
  }

  const pathArray = [];
  const reversedPath = path ? [...path].reverse() : null;

  for (const item of reversedPath) {
    const href =
      item.type === 'folder'
        ? `/folders/${item.id}`
        : item.type === 'file'
        ? `/files/${item.id}`
        : `/sections/${item.id}`;

    pathArray.push({ text: item.name, href: href });
  }

  console.log(data);

  return (
    <div>
      <HeadBar items={pathArray} />
      <div className="flex flex-col lg:flex-row gap-[48px]">
        <div className="w-[100%]">
          <ImageViewer src={`data:image/png;base64,${data.f}`} />
        </div>
        <div className="w-[100%] p-[16px] overflow-hidden bg-slate-200">
          <h2
            className={clsx(
              'text-mainColor1 text-[24px] mb-[32px] font-bold',
              contentFont.className,
            )}>
            OCR Text
          </h2>
          <MarkdownRenderer markdown={data.ocr} />
        </div>
      </div>
    </div>
  );
};

export default page;

