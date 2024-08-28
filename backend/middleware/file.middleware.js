import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname)
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 2 },
});
