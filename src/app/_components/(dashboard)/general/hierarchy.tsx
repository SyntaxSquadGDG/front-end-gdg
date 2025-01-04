'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useState } from 'react';

const HierarchicalView = ({
  data,
  selectedItem,
  setSelectedItem,
  setSelectedPath = () => {},
}) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});
  const baseSpacing = 8;
  const levelSpacing = 20;
  const commonClass =
    'cursor-pointer border-b-[1px] border-b-solid border-b-mainColor1 py-[4px] pr-[8px]';

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleFolder = (id) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelect = (id, type) => {
    setSelectedItem({ id, type }); // Update selected item with id and type
    const newPath = findPath(data, id, type); // Find the path for the new selection
    console.log(`NEW PATH IS ${newPath.join('/')}`);
    if (setSelectedPath) {
      setSelectedPath(newPath.join('/')); // Update the selected path
    }
  };

  const findPath = (data, id, type, currentPath = []) => {
    for (const section of data) {
      const sectionPath = [...currentPath, section.name];

      // Check if this section matches
      if (section.id === id && type === 'section') {
        return sectionPath;
      }

      // Traverse folders within the section
      if (section.folders) {
        const result = findFolderPath(section.folders, id, type, sectionPath);
        if (result.length > 0) return result;
      }
    }

    return []; // Return empty if not found
  };

  const findFolderPath = (folders, id, type, currentPath) => {
    for (const folder of folders) {
      const folderPath = [...currentPath, folder.name];

      // Check if this folder matches
      if (folder.id === id && type === 'folder') {
        return folderPath;
      }

      // Check files in this folder
      for (const file of folder.files || []) {
        if (file.id === id && type === 'file') {
          return [...folderPath, file.name];
        }
      }

      // Recurse into nested folders
      if (folder.folders?.length > 0) {
        const nestedPath = findFolderPath(folder.folders, id, type, folderPath);
        if (nestedPath.length > 0) return nestedPath;
      }
    }

    return [];
  };

  const renderFolders = (folders, level) => {
    return folders.map((folder) => {
      const isFolderExpanded = expandedFolders[folder.id];

      return (
        <div key={folder.id} className="">
          {/* Render folder */}
          <div
            style={{
              paddingLeft: `${baseSpacing + levelSpacing * level}px`,
              // paddingRight: `${baseSpacing + levelSpacing * level}px`,
            }}
            className={clsx(
              commonClass,
              folder.id === selectedItem.id && selectedItem.type === 'folder'
                ? 'bg-[#00001122]'
                : 'transparent',
            )}
            onClick={() => {
              toggleFolder(folder.id);
              handleSelect(folder.id, 'folder');
            }}>
            {isFolderExpanded ? '[-]' : '[+]'} {folder.name}
          </div>

          {/* Render files inside folder */}
          {isFolderExpanded &&
            folder.files?.map((file) => (
              <div
                key={file.id}
                style={{
                  paddingLeft: `${baseSpacing + levelSpacing * (level + 1)}px`,
                  // paddingRight: `${baseSpacing + levelSpacing * (level + 1)}px`,
                }}
                className={clsx(
                  commonClass,
                  file.id === selectedItem.id && selectedItem.type === 'file'
                    ? 'bg-[#00001122]'
                    : 'transparent',
                )}
                onClick={() => handleSelect(file.id, 'file')}>
                {file.name}
              </div>
            ))}

          {/* Recursively render nested folders */}
          {isFolderExpanded &&
            folder.folders?.length > 0 &&
            renderFolders(folder.folders, level + 1)}
        </div>
      );
    });
  };

  const renderSections = () => {
    return data.map((section) => {
      const isSectionExpanded = expandedSections[section.id];

      return (
        <div key={section.id} className="">
          {/* Render section */}
          <div
            style={{
              paddingLeft: `${baseSpacing}px`,
              paddingRight: `${baseSpacing}px`,
            }}
            className={clsx(
              commonClass,
              section.id === selectedItem.id && selectedItem.type === 'section'
                ? 'bg-[#00001122]'
                : 'transparent',
            )}
            onClick={() => {
              toggleSection(section.id);
              handleSelect(section.id, 'section');
            }}>
            {isSectionExpanded ? '[-]' : '[+]'} {section.name}
          </div>

          {/* Render folders inside section */}
          {isSectionExpanded && renderFolders(section.folders, 1)}
        </div>
      );
    });
  };

  const selectedItemPath = selectedItem.id
    ? findPath(data, selectedItem.id, selectedItem.type).join('/')
    : 'No item selected';

  return (
    <div className="flex flex-col gap-[16px] w-[100%]">
      <div
        className={clsx(
          contentFont.className,
          'rounded-[8px] overflow-hidden border-[1px] border-solid border-mainColor1 text-[20px] w-[100%]',
        )}>
        {renderSections()}
      </div>
      <div>
        <p className="text-[16px] text-mainColor1 font-medium">
          Selected Path:
        </p>
        <p>{selectedItemPath}</p>
      </div>
    </div>
  );
};

export default HierarchicalView;

