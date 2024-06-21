const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Route để tạo mới hoặc sửa một bệnh nhân
router.post('/createOrUpdate', patientController.createOrUpdatePatient);

// Route để lấy tất cả các bệnh nhân
router.get('/', patientController.getAllPatients);

// Route để lấy thông tin của một bệnh nhân theo email
router.post('/getByEmail', patientController.getPatientByEmail);

// Route để xóa một bệnh nhân theo ID
router.delete('/:id', patientController.deletePatientById);

module.exports = router;
