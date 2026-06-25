import { useState } from "react";
import axios from "axios";

function UploadDebugger() {
  const [file, setFile] = useState(null);
  const [logs, setLogs] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");

  const addLog = (message) => {
    setLogs((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()} - ${message}`,
    ]);
  };

  const uploadFile = async () => {
    if (!file) {
      addLog("No file selected");
      return;
    }

    try {
      addLog("Browser: File selected");

      const formData = new FormData();
      formData.append("image", file);

      addLog("React: Sending POST request");

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      addLog("Express: Request received");
      addLog("Multer: File validated");
      addLog("Cloudinary: Upload successful");
      addLog("API: Response returned");

      setImageUrl(response.data.secure_url);
      setPublicId(response.data.public_id);

      addLog("React: UI updated");
    } catch (error) {
      addLog(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
  <div className="app">
    <div className="container">

      <h1 className="title">
        Cloudinary Upload Debugger
      </h1>

      <div className="card">

        <input
          type="file"
          className="file-input"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="upload-btn"
          onClick={uploadFile}
        >
          Upload Image
        </button>

      </div>

      <div className="card">

        <h4 className="section-title">
          Request Timeline
        </h4>

        <ul className="logs">
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>

      </div>

      {imageUrl && (
        <div className="card">

          <h4 className="section-title">
            Cloudinary Result
          </h4>

          <img
            src={imageUrl}
            alt="uploaded"
            className="preview-image"
          />

          <p className="public-id">
            <strong>Public ID:</strong> {publicId}
          </p>

        </div>
      )}

    </div>
  </div>
);
}

export default UploadDebugger;