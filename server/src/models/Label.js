import mongoose from 'mongoose';

const labelSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true, trim: true },
  color: { type: String, required: true, default: '#000000' }
}, { timestamps: false });

labelSchema.index({ project: 1 });

const Label = mongoose.model('Label', labelSchema);
export default Label;
