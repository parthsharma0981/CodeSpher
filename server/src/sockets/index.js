import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import chatSocket from './chatSocket.js';
import notificationSocket from './notificationSocket.js';
import logger from '../utils/logger.js';

export const setupSockets = (io) => {
  // Auth middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers['authorization'];
      if (!token) return next(new Error('Authentication error'));
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return next(new Error('User not found'));
      
      socket.user = user;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.user.name} (${socket.id})`);
    
    // Join personal room for user-specific notifications
    socket.join(socket.user._id.toString());
    
    chatSocket(io, socket);
    notificationSocket(io, socket);
    
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.user.name} (${socket.id})`);
    });
  });
};
