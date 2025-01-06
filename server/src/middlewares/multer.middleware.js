import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import sanitize from "sanitize-filename";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = process.env.UPLOAD_DIR || "./uploads";
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const sanitizedOriginalName = sanitize(file.originalname);
    const uniqueSuffix = `${Date.now()}-${uuidv4()}-${sanitizedOriginalName}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only .jpeg, .png files are allowed"));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
