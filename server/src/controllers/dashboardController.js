import Project from '../models/Project.js';
import Task from '../models/Task.js';
import ActivityLog from '../models/ActivityLog.js';

export const getStats = async (req, res, next) => {
  try {
    const projects = await Project.countDocuments({ members: req.user.id });
    const tasks = await Task.countDocuments({ assignee: req.user.id });
    const completedTasks = await Task.countDocuments({ assignee: req.user.id, status: 'completed' });
    
    res.status(200).json({ 
      success: true, 
      data: { projects, tasks, completedTasks } 
    });
  } catch (error) {
    next(error);
  }
};

export const getRecentActivity = async (req, res, next) => {
  try {
    const activities = await ActivityLog.find({ user: req.user.id })
      .sort('-createdAt')
      .limit(10);
    res.status(200).json({ success: true, data: activities });
  } catch (error) {
    next(error);
  }
};
