import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
}, { timestamps: true });

fileSchema.index({ uploadedBy: 1 });
fileSchema.index({ project: 1 });
fileSchema.index({ task: 1 });

const File = mongoose.model('File', fileSchema);
export default File;
