export default (io, socket) => {
  // Emitting a notification from backend to specific user
  socket.on('send_notification', (data) => {
    // Expected data: { userId, notification }
    io.to(data.userId).emit('new_notification', data.notification);
  });
};
