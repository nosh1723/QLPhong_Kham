module.exports = (io, socket) => {
    // Tham gia vào một phòng dựa trên ID bệnh nhân và ID bác sĩ
    socket.on('joinRoom', ({ userId, doctorId }) => {
        const roomName = `room_${userId}_${doctorId}`;
        socket.join(roomName);
        console.log(`Người dùng ${userId} đã tham gia phòng ${roomName}`);
    });

    // Xử lý sự kiện nhắn tin
    socket.on('message', ({ message, userId, doctorId }) => {
        const roomName = `room_${userId}_${doctorId}`;
        io.to(roomName).emit('message', { message, userId, doctorId });
        console.log(`Tin nhắn từ ${userId} tới phòng ${roomName}: ${message}`);
    });

    // Ngắt kết nối
    socket.on('disconnect', () => {
        console.log('Người dùng đã ngắt kết nối:', socket.id);
    });
};
