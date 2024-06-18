const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController'); // Import controller

// Đường dẫn để lấy danh sách tất cả các bác sĩ kèm thông tin chi nhánh và dịch vụ
router.get('/', doctorController.getAllDoctors);

// Đường dẫn để lấy thông tin chi tiết của bác sĩ theo ID, bao gồm chi nhánh và dịch vụ
router.get('/:id', doctorController.getDoctorById);

module.exports = router;
