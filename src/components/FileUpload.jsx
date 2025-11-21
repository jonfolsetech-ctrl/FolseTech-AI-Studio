import React, { useState } from 'react';

export default function FileUpload() {
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  return (
    <div className="file-upload">
      <div 
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="drop-zone-content">
          <div className="upload-icon">📁</div>
          <p>Drag & drop files here</p>
          <p className="or-text">or</p>
          <label className="file-input-label">
            <input 
              type="file" 
              multiple 
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
            Browse Files
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className="file-list">
          <h3>Uploaded Files</h3>
          {files.map((file, idx) => (
            <div key={idx} className="file-item">
              <span className="file-icon">📄</span>
              <span className="file-name">{file.name}</span>
              <span className="file-size">
                {(file.size / 1024).toFixed(2)} KB
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
