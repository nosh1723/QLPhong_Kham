const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const doctorServiceController = require('../controllers/doctorServiceController');
const roleMiddleware = require('../middleware/roleMiddleware');

// Đường dẫn để lấy danh sách tất cả các bác sĩ kèm thông tin chi nhánh và dịch vụ
router.get('/', doctorController.getAllDoctors);

//tạo mới 1 bs
router.post('/create', roleMiddleware(['staff', 'admin']), doctorController.createDoctor)

// Đường dẫn để lấy thông tin chi tiết của bác sĩ theo ID, bao gồm chi nhánh và dịch vụ
router.get('/:id', doctorController.getDoctorById);

// Lấy danh sách tất cả các dịch vụ của bác sĩ
router.get('/doctorServices', doctorServiceController.getAllDoctorServices);

// Lấy danh sách dịch vụ của một bác sĩ dựa trên ID bác sĩ
router.get('/doctorServicesById/:doctorId', doctorServiceController.getDoctorServicesByDoctorId);

// Lấy thông tin một dịch vụ theo ID
router.get('/doctorService/:id', doctorServiceController.getDoctorServiceById);

module.exports = router;
