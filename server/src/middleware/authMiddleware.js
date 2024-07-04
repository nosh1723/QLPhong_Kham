const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Lấy token từ header Authorization
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Không có token, xác thực bị từ chối' });
    }

    try {
        // Xác thực token và giải mã thông tin người dùng
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // Gán thông tin người dùng vào đối tượng request
        next(); // Chuyển tiếp tới middleware tiếp
    } catch (err) {
      /*   console.error('Token verification failed:', err.message); // dể debug  */
        return res.status(400).json({ message: 'Token không hợp lệ' });
    } 
};
