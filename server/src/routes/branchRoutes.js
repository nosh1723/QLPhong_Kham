const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');

// Lấy tất cả các chi nhánh
router.get('/', async (req, res) => {
    try {
        const branches = await Branch.find();
        res.json(branches);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' }); // Trả về lỗi nếu có lỗi máy chủ
    }
});

// Lấy chi nhánh theo _id
router.get('/:id', async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!branch) {
            return res.status(404).json({ message: 'Không tìm thấy chi nhánh' }); // Trả về thông báo khi không tìm thấy chi nhánh
        }
        res.json(branch); // Trả về chi nhánh nếu tìm thấy
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' }); // Trả về lỗi nếu có lỗi máy chủ
    }
});

module.exports = router;
