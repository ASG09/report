import React, { useRef, useState } from 'react';
import { createReport } from '../api/report';
import './Header.css';

function Header() {
  const [cvFile, setCvFile] = useState(null);
  const [templateFile, setTemplateFile] = useState(null);

  const cvInputRef = useRef(null);
  const templateInputRef = useRef(null);

  const handleCVSelect = (event) => {
    setCvFile(event.target.files[0]);
    console.log('Selected CV:', event.target.files[0]);
  };

  const handleTemplateSelect = (event) => {
    setTemplateFile(event.target.files[0]);
    console.log('Selected Template:', event.target.files[0]);
  };

  const createAndDownloadReport = (response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'generated_report.docx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (cvFile && templateFile) {
      try {
        const response = await createReport(cvFile, templateFile);
        createAndDownloadReport(response);
      } catch (error) {
        console.error('Error creating report:', error);
      }
    } else {
      alert('Both CV and Template files are required!');
    }
  };

  return (
    <header className="p-3 border-bottom Header">
      <div className="container d-flex justify-content-between align-items-center">
        <h2>CV Report</h2>
        <form onSubmit={handleSubmit} className="d-flex align-items-center">
          <div>
            <label htmlFor="cvUpload" className="btn btn-primary m-2">
              Select CV
            </label>
            <input
              id="cvUpload"
              type="file"
              accept=".pdf,.docx"
              ref={cvInputRef}
              style={{ display: 'none' }}
              onChange={handleCVSelect}
            />
          </div>
          <div>
            <label htmlFor="templateUpload" className="btn btn-primary m-2">
              Select Template
            </label>
            <input
              id="templateUpload"
              type="file"
              accept=".pdf,.docx"
              ref={templateInputRef}
              style={{ display: 'none' }}
              onChange={handleTemplateSelect}
            />
          </div>
          <button type="submit" className="btn btn-success m-2">
            Create Report
          </button>
          <button type="button" className="btn btn-secondary m-2" disabled>
            Download Report
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
