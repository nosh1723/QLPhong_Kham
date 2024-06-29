const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Lấy token 
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Không có token, xác thực bị từ chối' });

    try {
        // Xác thực token và giải mã thông tin người dùng
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token không hợp lệ' });
    }
};
