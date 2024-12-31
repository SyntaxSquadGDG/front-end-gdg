const permissionsData = [
  {
    type: 'folder',
    name: 'My folder',
    id: 1,
    folderPermissions: [0, 1, 2],
    subFolderPermissions: [0, 1],
    filePermissions: [0, 1, 2, 3],
  },
  {
    type: 'folder',
    name: 'My folder2',

    id: 2,
    folderPermissions: [0, 1],
    subFolderPermissions: [0, 1, 2, 3],
    filePermissions: [0],
  },
  {
    type: 'section',
    name: 'My Section',

    id: 3,
    sectionPermissions: [0, 1, 2],
  },
  {
    type: 'file',
    name: 'My File',
    id: 4,
    filePermissions: [0, 1, 2],
  },
  {
    type: 'folder',
    name: 'My folder3',
    id: 5,
    folderPermissions: [0],
    subFolderPermissions: [0],
    filePermissions: [0],
  },
  {
    type: 'section',
    name: 'My Section2',
    id: 6,
    sectionPermissions: [0, 1, 2],
  },
  {
    type: 'file',
    name: 'My file2',
    id: 7,
    filePermissions: [0, 1],
  },
  {
    type: 'folder',
    name: 'My folder3',
    id: 8,
    folderPermissions: [0, 1],
    subFolderPermissions: [0, 1],
    filePermissions: [0],
  },
  {
    type: 'section',
    name: 'My section4',
    id: 9,
    sectionPermissions: [0, 1],
  },
  {
    type: 'file',
    name: 'My file3',
    id: 10,
    filePermissions: [0],
  },
];

module.exports = { permissionsData };

