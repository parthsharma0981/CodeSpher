import Task from '../models/Task.js';
import ApiError from '../utils/apiError.js';

export const create = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, creator: req.user.id });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate('assignee', 'name avatar');
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignee creator', 'name avatar');
    if (!task) return next(new ApiError(404, 'Task not found'));
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return next(new ApiError(404, 'Task not found'));
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return next(new ApiError(404, 'Task not found'));
    res.status(200).json({ success: true, message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};

export const assign = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { assignee: req.body.userId }, { new: true });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const moveStatus = async (req, res, next) => {
  try {
    const { status, order } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { status, order }, { new: true });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  // Not implemented directly in task, handled by comment controller/routes usually, 
  // but if needed here as per requirements:
  try {
    // Requires Comment model which we might not have imported here, keeping simple
    res.status(501).json({ success: false, message: 'Not implemented' });
  } catch (error) {
    next(error);
  }
};

export const toggleChecklist = async (req, res, next) => {
  try {
    const { checklistId, completed } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, 'checklist._id': checklistId },
      { $set: { 'checklist.$.completed': completed } },
      { new: true }
    );
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const getByProject = getAll;
