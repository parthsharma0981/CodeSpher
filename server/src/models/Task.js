import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  status: { type: String, enum: ['backlog', 'todo', 'in-progress', 'review', 'testing', 'completed'], default: 'todo' },
  dueDate: { type: Date },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  labels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }],
  order: { type: Number, default: 0 },
  checklist: [{
    text: { type: String, required: true },
    completed: { type: Boolean, default: false }
  }],
  timeTracked: { type: Number, default: 0 }
}, { timestamps: true });

taskSchema.index({ project: 1, status: 1 });
taskSchema.index({ assignee: 1 });

const Task = mongoose.model('Task', taskSchema);
export default Task;
