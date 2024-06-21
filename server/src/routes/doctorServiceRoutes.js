const express = require('express');
const router = express.Router();
const doctorServiceController = require('../controllers/doctorServiceController');

// Lấy danh sách tất cả các dịch vụ của bác sĩ
router.get('/', doctorServiceController.getAllDoctorServices);

// Lấy danh sách dịch vụ của một bác sĩ dựa trên ID bác sĩ
router.get('/getDoctorServices/:doctorId', doctorServiceController.getDoctorServicesByDoctorId);

// Lấy thông tin một dịch vụ theo ID
router.get('/id/:id', doctorServiceController.getDoctorServiceById);

// Lấy thông tin một dịch vụ theo ID 
router.get('/id/:id', doctorServiceController.getDoctorServiceById);

module.exports = router;
