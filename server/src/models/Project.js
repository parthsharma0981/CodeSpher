import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  deadline: { type: Date },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  isArchived: { type: Boolean, default: false },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  labels: [{ type: String }]
}, { timestamps: true });

projectSchema.index({ workspace: 1 });

const Project = mongoose.model('Project', projectSchema);
export default Project;
