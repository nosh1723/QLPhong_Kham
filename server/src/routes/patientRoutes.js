const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const roleMiddleware = require('../middleware/roleMiddleware')

// Route để tạo mới hoặc sửa một bệnh nhân
router.post('/createOrUpdate', patientController.createOrUpdatePatient);

// Route để lấy tất cả các bệnh nhân
router.get('/',roleMiddleware(['doctor', 'staff', 'admin']), patientController.getAllPatients);

// Route để lấy thông tin của một bệnh nhân 
router.get('/getById/:id', patientController.getPatientById);

// Route để xóa một bệnh nhân theo ID
router.delete('/:id',roleMiddleware(['doctor', 'staff', 'admin']), patientController.deletePatientById);

module.exports = router;
