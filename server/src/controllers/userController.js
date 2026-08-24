import User from '../models/User.js';
import ApiError from '../utils/apiError.js';
import { paginate } from '../utils/helpers.js';

export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const { skip, limit: lim } = paginate(parseInt(page), parseInt(limit));

    const query = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const users = await User.find(query)
      .select('-password -otp -resetPasswordToken -refreshToken')
      .skip(skip)
      .limit(lim);
      
    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: users,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / lim) }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password -otp -resetPasswordToken -refreshToken');
    if (!user) return next(new ApiError(404, 'User not found'));
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return next(new ApiError(403, 'Not authorized to update this user'));
    }

    const updates = { ...req.body };
    delete updates.password;
    delete updates.role;
    delete updates.email;

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password');
    if (!user) return next(new ApiError(404, 'User not found'));

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return next(new ApiError(403, 'Not authorized to delete this user'));
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(new ApiError(404, 'User not found'));

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    // Assuming file is already uploaded to cloud and URL is passed in body, or handled by a middleware
    const { avatarUrl } = req.body;
    if (!avatarUrl) return next(new ApiError(400, 'Avatar URL is required'));

    const user = await User.findByIdAndUpdate(req.user.id, { avatar: avatarUrl }, { new: true });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
