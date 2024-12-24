import React, { useState } from 'react';
import Modal from './modal';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import HierarchicalView from '../general/hierarchy';
import Button from '../general/button';
import { useTranslations } from 'next-intl';

// const data = [
//   {
//     id: 1,
//     name: 'Folder 1',
//     files: [
//       { id: 1, name: 'File 1' },
//       { id: 2, name: 'File 2' },
//     ],
//     folders: [
//       {
//         id: 101,
//         name: 'Folder 1-1',
//         files: [
//           { id: 7, name: 'File 7' },
//           { id: 8, name: 'File 8' },
//         ],
//         folders: [
//           {
//             id: 201,
//             name: 'Folder 1-1-1',
//             files: [{ id: 9, name: 'File 9' }],
//             folders: [], // No further subfolders
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'Folder 2',
//     files: [
//       { id: 3, name: 'File 3' },
//       { id: 4, name: 'File 4' },
//     ],
//     folders: [], // No subfolders
//   },
// ];

const data = [
  {
    id: 1,
    name: 'Section 1',
    folders: [
      {
        id: 1,
        name: 'Folder 1',
        files: [
          { id: 1, name: 'File 1' },
          { id: 2, name: 'File 2' },
        ],
        folders: [
          {
            id: 101,
            name: 'Folder 1-1',
            files: [
              { id: 7, name: 'File 7' },
              { id: 8, name: 'File 8' },
            ],
            folders: [
              {
                id: 201,
                name: 'Folder 1-1-1',
                files: [{ id: 9, name: 'File 9' }],
                folders: [], // No further subfolders
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'Folder 2',
        files: [
          { id: 3, name: 'File 3' },
          { id: 4, name: 'File 4' },
        ],
        folders: [], // No subfolders
      },
    ],
  },
  {
    id: 2,
    name: 'Section 2',
    folders: [
      {
        id: 3,
        name: 'Folder 3',
        files: [
          { id: 5, name: 'File 5' },
          { id: 6, name: 'File 6' },
        ],
        folders: [
          {
            id: 102,
            name: 'Folder 3-1',
            files: [{ id: 10, name: 'File 10' }],
            folders: [
              {
                id: 401,
                name: 'Folder 3-1-1',
                files: [{ id: 19, name: 'File 19' }],
                folders: [], // No further subfolders
              },
            ], // No further subfolders
          },
        ],
      },
    ],
  },
];

const MoveModal = ({ move, type, id, itemName }) => {
  const { modalStack, closeModal } = useModal();
  const [selectedItem, setSelectedItem] = useState({ type: null, id: null });
  const t = useTranslations();
  const name = `${move ? 'move' : 'copy'}${type}${id}`;

  function handleMove() {}

  function handleCopy() {}

  function handleClose() {
    closeModal();
    setSelectedItem({ type: null, id: null });
  }

  return (
    <Modal
      isOpen={modalStack.includes(name)}
      onClose={handleClose}
      innerClassName="w-[800px]"
      className={contentFont.className}>
      <h2 className="text-[20px] font-medium text-mainColor1 mb-[32px]">
        {move ? t('general.move') : t('general.copy')} {itemName}{' '}
        {t('general.to')}
      </h2>

      <HierarchicalView
        data={data}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <Button
        text={move ? t('modals.moveButton') : t('modals.copyButton')}
        onClick={move ? handleMove() : handleCopy()}
        className={'w-[100%] mt-[32px]'}
      />
    </Modal>
  );
};

export default MoveModal;

