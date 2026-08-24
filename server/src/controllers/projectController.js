import Project from '../models/Project.js';
import WorkspaceMember from '../models/WorkspaceMember.js';
import ApiError from '../utils/apiError.js';

export const create = async (req, res, next) => {
  try {
    const { workspaceId, name, description, deadline } = req.body;
    
    const isMember = await WorkspaceMember.findOne({ workspace: workspaceId, user: req.user.id });
    if (!isMember) return next(new ApiError(403, 'Not a member of this workspace'));

    const project = await Project.create({
      workspace: workspaceId,
      name,
      description,
      deadline,
      members: [req.user.id]
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const projects = await Project.find({ workspace: req.params.workspaceId });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('members', 'name avatar email');
    if (!project) return next(new ApiError(404, 'Project not found'));
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return next(new ApiError(404, 'Project not found'));
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return next(new ApiError(404, 'Project not found'));
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};

export const addMember = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } },
      { new: true }
    );
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const removeMember = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: userId } },
      { new: true }
    );
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const archive = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { isArchived: true }, { new: true });
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};
