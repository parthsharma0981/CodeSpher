export default (io, socket) => {
  socket.on('join_workspace', (workspaceId) => {
    socket.join(`workspace_${workspaceId}`);
  });

  socket.on('leave_workspace', (workspaceId) => {
    socket.leave(`workspace_${workspaceId}`);
  });

  socket.on('send_message', (message) => {
    io.to(`workspace_${message.workspace}`).emit('new_message', message);
  });

  socket.on('typing', ({ workspaceId, userId, name }) => {
    socket.to(`workspace_${workspaceId}`).emit('user_typing', { userId, name });
  });

  socket.on('stop_typing', ({ workspaceId, userId }) => {
    socket.to(`workspace_${workspaceId}`).emit('user_stop_typing', { userId });
  });
};
