import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

function App() {
  const cardRef = useRef(null);

  const [student, setStudent] = useState({
    name: '',
    roll: '',
    branch: '',
    college: '',
    photo: null,
  });

  const [template, setTemplate] = useState('classic');

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleDownload = () => {
    if (cardRef.current === null) return;

    htmlToImage.toPng(cardRef.current)
      .then((dataUrl) => {
        download(dataUrl, 'student-id-card.png');
      })
      .catch((err) => {
        console.error('Error generating image:', err);
      });
  };

  return (
    <div className="container">
      <h1>Smart Student ID Generator</h1>

      <select value={template} onChange={(e) => setTemplate(e.target.value)}>
        <option value="classic">Classic</option>
        <option value="modern">Modern</option>
        <option value="minimal">Minimal</option>
      </select>

      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={student.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="roll"
          placeholder="Enter Roll Number"
          value={student.roll}
          onChange={handleChange}
        />
        <input
          type="text"
          name="branch"
          placeholder="Enter Branch"
          value={student.branch}
          onChange={handleChange}
        />
        <input
          type="text"
          name="college"
          placeholder="Enter College Name"
          value={student.college}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setStudent({ ...student, photo: URL.createObjectURL(e.target.files[0]) })
          }
        />
      </div>

      {/* Preview Card */}
      <div className={`preview ${template}`} ref={cardRef}>
        <div className="id-card-content">
          
          {/* Photo */}
          {student.photo && (
            <div className="photo-section">
              <img
                src={student.photo}
                alt="Student"
              />
            </div>
          )}

          {/* Student Info */}
          <div className="info-section">
            <h2>ID Card Preview</h2>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Roll No:</strong> {student.roll}</p>
            <p><strong>Branch:</strong> {student.branch}</p>
            <p><strong>College:</strong> {student.college}</p>
          </div>

          {/* QR Code */}
          {student.name && student.roll && (
            <div className="qr-section">
              <QRCodeCanvas value={`${student.name} - ${student.roll}`} />
            </div>
          )}
        </div>
      </div>

      <button className="download-btn" onClick={handleDownload}>
        Download ID Card
      </button>
    </div>
  );
}

export default App;
