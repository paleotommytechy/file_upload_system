import { useState } from "react";
import axios from "axios";
import "./App.css";

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
    <main className="app">
      <div className="app-container">
        <header className="hero">
          <h1>☁️ Cloudinary Upload Debugger</h1>
          <p>Track the image upload flow from React to Cloudinary.</p>
        </header>

        <section className="card upload-card">
          <h2>Upload Image</h2>

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
        </section>

        <section className="card">
          <h2>Request Timeline</h2>

          {logs.length === 0 ? (
            <p className="empty-state">
              Upload an image to see request logs.
            </p>
          ) : (
            <ul className="logs">
              {logs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          )}
        </section>

        {imageUrl && (
          <section className="card result-card">
            <h2>Cloudinary Result</h2>

            <img
              src={imageUrl}
              alt="uploaded"
              className="preview-image"
            />

            <div className="public-id">
              <span>Public ID</span>
              <code>{publicId}</code>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default UploadDebugger;