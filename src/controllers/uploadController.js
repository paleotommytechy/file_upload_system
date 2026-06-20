const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "uploads",
    });

    return res.status(200).json({
      message: "Upload successful",
      secure_url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};

module.exports = { uploadImage };