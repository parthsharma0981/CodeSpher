import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  avatar: { type: String, default: '' },
  inviteCode: { type: String, unique: true, sparse: true }
}, { timestamps: true });

workspaceSchema.index({ owner: 1 });

const Workspace = mongoose.model('Workspace', workspaceSchema);
export default Workspace;
