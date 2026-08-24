import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['task_assigned', 'task_completed', 'comment_added', 'deadline_reminder', 'member_joined', 'invitation_accepted'],
    required: true 
  },
  content: { type: String, required: true },
  relatedId: { type: mongoose.Schema.Types.ObjectId, required: true },
  relatedModel: { type: String, required: true },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

notificationSchema.index({ user: 1, isRead: 1 });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
