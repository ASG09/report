import React, { useRef } from 'react';
import { uploadCV } from '../api/report';

function Header() {
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      try {
        const response = await uploadCV(file);
        console.log('Upload success:', response);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <header className="p-3 border-bottom Header">
      <div className="container d-flex justify-content-between align-items-center">
        <h2>CV Report</h2>
        <div>
          <button type="button" className="btn btn-primary m-2" onClick={triggerFileInput}>
            Upload CV
          </button>
          <button type="button" className="btn btn-primary m-2" disabled>
            Upload report template
          </button>
          <button type="button" className="btn btn-primary m-2" disabled>
            Generate report
          </button>
          <button type="button" className="btn btn-primary m-2" disabled>
            Download report
          </button>
          <input
            type="file"
            accept=".pdf,.docx"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
