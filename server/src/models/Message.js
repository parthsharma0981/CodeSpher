import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String },
  type: { type: String, enum: ['text', 'file', 'image'], default: 'text' },
  fileUrl: { type: String },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

messageSchema.index({ workspace: 1, sender: 1, receiver: 1 });

const Message = mongoose.model('Message', messageSchema);
export default Message;
