import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setCompressedImage(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('https://image-compressor-fkpu.onrender.com', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setCompressedImage(url);
    } catch (error) {
      alert('Compression failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🖼️ Image Compressor</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Compressing...' : 'Compress Image'}
      </button>
      {compressedImage && (
        <div style={{ marginTop: 20 }}>
          <a href={compressedImage} download="compressed.jpg">⬇️ Download Compressed Image</a>
        </div>
      )}
    </div>
  );
}

export default App;
