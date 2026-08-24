import File from '../models/File.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/fileService.js';
import ApiError from '../utils/apiError.js';
import fs from 'fs';

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) return next(new ApiError(400, 'No file uploaded'));

    // If memory storage is used in multer: req.file.buffer
    // If disk storage: read from req.file.path
    const fileBuffer = req.file.buffer || fs.readFileSync(req.file.path);
    
    const result = await uploadToCloudinary(fileBuffer);
    
    // Clean up disk file if it exists
    if (req.file.path) fs.unlinkSync(req.file.path);

    const file = await File.create({
      name: req.file.originalname,
      url: result.secure_url,
      type: req.file.mimetype,
      size: req.file.size,
      uploadedBy: req.user.id,
      project: req.body.projectId,
      task: req.body.taskId
    });

    res.status(201).json({ success: true, data: file });
  } catch (error) {
    next(error);
  }
};

export const getFiles = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.projectId) query.project = req.query.projectId;
    if (req.query.taskId) query.task = req.query.taskId;

    const files = await File.find(query).populate('uploadedBy', 'name');
    res.status(200).json({ success: true, data: files });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return next(new ApiError(404, 'File not found'));

    // Extract public_id from url
    const publicId = file.url.split('/').pop().split('.')[0];
    await deleteFromCloudinary(`codesphere/${publicId}`);
    
    await file.deleteOne();
    res.status(200).json({ success: true, message: 'File deleted' });
  } catch (error) {
    next(error);
  }
};
