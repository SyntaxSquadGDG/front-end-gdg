import React, { useRef, useState } from 'react';
import VerticalDotsSVG from '../../svgs/general/vertical-dots';
import ImageSVG from '../../svgs/files/image';
import WordSVG from '../../svgs/files/word';
import PdfSVG from '../../svgs/files/pdf';
import ExcelSVG from '../../svgs/files/excel';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';
import Link from 'next/link';
import Modal from '../modals/modal';
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';
import useClickOutside from '@app/_hooks/useclickoutside';
import FileIcon from '../general/file-icon';
import DeleteFileModal from '../modals/delete-file-modal';
import ItemModal from '../modals/item-modal';
import SettingsSVG from '@app/_components/svgs/general/settings';
import DeleteModal from '../modals/delete-modal';
import ItemModalItem from '../modals/item-modal-item';
import EditPermissionsSVG from '@app/_components/svgs/modals/edit-permissions';
import ItemPermissionsEditModal from '../modals/item-permissions-edit-modal';
import EditSVG from '@app/_components/svgs/modals/edit';
import RenameModal from '../modals/rename-modal';
import ShowVersionSVG from '@app/_components/svgs/modals/show-version';
import UpdateSVG from '@app/_components/svgs/modals/update';
import MetadataSVG from '@app/_components/svgs/modals/metadata';
import MoveModal from '../modals/move-modal';
import MoveSVG from '@app/_components/svgs/modals/move';
import CopySVG from '@app/_components/svgs/modals/copy';
import RemoveSVG from '@app/_components/svgs/modals/remove';
import FileSettings from './file-settings';
import ShowVersionsModal from './show-versions-modal';
import UploadNewVersionModal from './upload-new-version-modal';
import FileMetadataModal from './file-metadata-modal';
import FileSettingsModals from './file-settings-modals';

const FileItem = ({ file, parentId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const t = useTranslations();
  const { openModal, closeModal, modalStack } = useModal();

  console.log(file);

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div
      ref={containerRef}
      className="rounded-[16px] border-[1px] border-solid border-blue3 p-[24px]">
      <FileSettings id={file.id} />
      <Link
        href={`/files/${file.id}`}
        className="mt-[8px] mb-[22px] flex items-center justify-center">
        <FileIcon type={file.type} />
      </Link>
      <div className={clsx(contentFont.className, 'flex flex-col gap-[10px]')}>
        <p className="text-[18px] font-medium">{file.name}</p>
        <p className="text-[14px] font-medium text-textGray">{file.size}</p>
      </div>

      <FileSettingsModals
        id={file.id}
        parentFolderId={file.parentFolderId}
        name={file.name}
      />
    </div>
  );
};

export default FileItem;

