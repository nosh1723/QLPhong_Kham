const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Định nghĩa các route cho các hoạt động liên quan đến dịch vụ

// Route để tạo mới một dịch vụ
router.post('/services', serviceController.createService);

// Route để lấy tất cả các dịch vụ
router.get('/services', serviceController.getAllServices);

// Route để lấy thông tin của một dịch vụ theo ID
router.get('/services/:id', serviceController.getServiceById);

// Route để cập nhật thông tin của một dịch vụ theo ID
router.put('/services/:id', serviceController.updateServiceById);

// Route để xóa một dịch vụ theo ID
router.delete('/services/:id', serviceController.deleteServiceById);

module.exports = router;
