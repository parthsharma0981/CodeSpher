import Workspace from '../models/Workspace.js';
import WorkspaceMember from '../models/WorkspaceMember.js';
import ApiError from '../utils/apiError.js';
import { generateInviteCode } from '../utils/helpers.js';

export const create = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const inviteCode = generateInviteCode();
    
    const workspace = await Workspace.create({
      name,
      description,
      owner: req.user.id,
      inviteCode
    });

    await WorkspaceMember.create({
      workspace: workspace._id,
      user: req.user.id,
      role: 'admin'
    });

    res.status(201).json({ success: true, data: workspace });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const memberships = await WorkspaceMember.find({ user: req.user.id }).populate('workspace');
    const workspaces = memberships.map(m => m.workspace);
    res.status(200).json({ success: true, data: workspaces });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const workspace = await Workspace.findById(req.params.id).populate('owner', 'name email avatar');
    if (!workspace) return next(new ApiError(404, 'Workspace not found'));
    
    const isMember = await WorkspaceMember.findOne({ workspace: workspace._id, user: req.user.id });
    if (!isMember) return next(new ApiError(403, 'Not a member of this workspace'));

    res.status(200).json({ success: true, data: workspace });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const workspace = await Workspace.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!workspace) return next(new ApiError(404, 'Workspace not found or unauthorized'));
    res.status(200).json({ success: true, data: workspace });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const workspace = await Workspace.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!workspace) return next(new ApiError(404, 'Workspace not found or unauthorized'));
    
    await WorkspaceMember.deleteMany({ workspace: req.params.id });
    res.status(200).json({ success: true, message: 'Workspace deleted' });
  } catch (error) {
    next(error);
  }
};

export const inviteMember = async (req, res, next) => {
  try {
    // Generate new invite code
    const workspace = await Workspace.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { inviteCode: generateInviteCode() },
      { new: true }
    );
    if (!workspace) return next(new ApiError(404, 'Workspace not found or unauthorized'));
    res.status(200).json({ success: true, inviteCode: workspace.inviteCode });
  } catch (error) {
    next(error);
  }
};

export const getMembers = async (req, res, next) => {
  try {
    const members = await WorkspaceMember.find({ workspace: req.params.id }).populate('user', 'name email avatar');
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
};

export const removeMember = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const workspace = await Workspace.findById(req.params.id);
    if (workspace.owner.toString() === userId) {
      return next(new ApiError(400, 'Cannot remove the owner'));
    }

    if (workspace.owner.toString() !== req.user.id && req.user.id !== userId) {
      return next(new ApiError(403, 'Unauthorized'));
    }

    await WorkspaceMember.findOneAndDelete({ workspace: req.params.id, user: userId });
    res.status(200).json({ success: true, message: 'Member removed' });
  } catch (error) {
    next(error);
  }
};
