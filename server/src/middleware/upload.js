import multer from 'multer';
import ApiError from '../utils/apiError.js';

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('application/pdf') || file.mimetype.startsWith('text/')) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Not supported file type!'), false);
  }
};

export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter 
});
