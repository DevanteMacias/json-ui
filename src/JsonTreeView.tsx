import React, { useState } from 'react';

interface JsonTreeViewProps {
  data: Record<string, any>;
  onChange: (updatedData: Record<string, any>) => void;
}

const JsonTreeView: React.FC<JsonTreeViewProps> = ({ data, onChange }) => {
  const [localData, setLocalData] = useState(data);

  const handleValueChange = (key: string, value: any) => {
    const updatedData = { ...localData, [key]: value };
    setLocalData(updatedData);
    onChange(updatedData);
  };

  return (
    <div className="json-tree-view">
      {Object.keys(localData).map(key => (
        <div className="json-item" key={key}>
          <div className="json-key">{key}:</div>
          {typeof localData[key] === 'object' && localData[key] !== null ? (
            <JsonTreeView data={localData[key]} onChange={(updatedData) => handleValueChange(key, updatedData)} />
          ) : (
            <input
              className="json-value"
              value={localData[key]}
              onChange={(e) => handleValueChange(key, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default JsonTreeView;