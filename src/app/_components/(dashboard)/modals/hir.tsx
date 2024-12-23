'use client';
import { useState } from 'react';

const HierarchicalView = ({ data, selectedItem, setSelectedItem }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});

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
  };

  const renderFolders = (folders, level) => {
    return folders.map((folder) => {
      const isFolderExpanded = expandedFolders[folder.id];

      return (
        <div key={folder.id} style={{ marginLeft: `${level * 20}px` }}>
          <div
            style={{
              cursor: 'pointer',
              padding: '5px',
              backgroundColor:
                folder.id === selectedItem.id && selectedItem.type === 'folder'
                  ? '#e0f7fa'
                  : 'transparent',
            }}
            onClick={() => {
              toggleFolder(folder.id);
              handleSelect(folder.id, 'folder');
            }}>
            {folder.name}{' '}
            {folder.folders && <span>{isFolderExpanded ? '-' : '+'}</span>}
          </div>
          {isFolderExpanded &&
            folder.files?.map((file) => (
              <div
                key={file.id}
                style={{
                  marginLeft: `${(level + 1) * 20}px`,
                  cursor: 'pointer',
                  padding: '5px',
                  backgroundColor:
                    file.id === selectedItem.id && selectedItem.type === 'file'
                      ? '#e0f7fa'
                      : 'transparent',
                }}
                onClick={() => handleSelect(file.id, 'file')}>
                📄 {file.name}
              </div>
            ))}
        </div>
      );
    });
  };

  const renderSections = () => {
    return data.map((section) => {
      const isSectionExpanded = expandedSections[section.id];

      return (
        <div key={section.id}>
          <div
            style={{
              cursor: 'pointer',
              padding: '5px',
              backgroundColor:
                section.id === selectedItem.id &&
                selectedItem.type === 'section'
                  ? '#e0f7fa'
                  : 'transparent',
            }}
            onClick={() => {
              toggleSection(section.id);
              handleSelect(section.id, 'section');
            }}>
            {section.name}{' '}
            {section.folders && <span>{isSectionExpanded ? '-' : '+'}</span>}
          </div>
          {isSectionExpanded && renderFolders(section.folders, 1)}
        </div>
      );
    });
  };

  return (
    <div>
      {renderSections()}
      <div style={{ marginTop: '20px' }}>
        <strong>Selected Item:</strong>
        <p>Type: {selectedItem.type}</p>
        <p>ID: {selectedItem.id}</p>
      </div>
    </div>
  );
};

export default HierarchicalView;

