import Message from '../models/Message.js';
import ApiError from '../utils/apiError.js';

export const send = async (req, res, next) => {
  try {
    const { workspaceId, receiverId, content, type, fileUrl } = req.body;
    const message = await Message.create({
      workspace: workspaceId,
      sender: req.user.id,
      receiver: receiverId,
      content,
      type,
      fileUrl
    });
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const { workspaceId, userId } = req.params;
    const messages = await Message.find({
      workspace: workspaceId,
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id }
      ]
    }).sort('createdAt');
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};

export const getWorkspaceMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ workspace: req.params.workspaceId, receiver: { $exists: false } }).sort('createdAt');
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const message = await Message.findOneAndDelete({ _id: req.params.id, sender: req.user.id });
    if (!message) return next(new ApiError(404, 'Message not found or unauthorized'));
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    await Message.updateMany(
      { receiver: req.user.id, workspace: req.params.workspaceId, isRead: false },
      { isRead: true }
    );
    res.status(200).json({ success: true, message: 'Messages marked as read' });
  } catch (error) {
    next(error);
  }
};
