const express = require('express');
const router = express.Router();
const workHouseDoctorController = require('../controllers/workHouseDoctorController');
const roleMiddleware = require('../middleware/roleMiddleware')

//  Tạo mới một bản ghi lịch làm việc
router.post('/',roleMiddleware(['doctor', 'staff', 'admin']), workHouseDoctorController.createWorkHouse);

//  Cập nhật một bản ghi lịch làm việc theo ID
router.put('/:id',roleMiddleware(['doctor', 'staff', 'admin']), workHouseDoctorController.updateWorkHouse);

//  Xóa một bản ghi ,h làm việc theo ID
router.delete('/:id',roleMiddleware(['doctor', 'staff', 'admin']), workHouseDoctorController.deleteWorkHouse);

//  Lấy tất cả các bản ghi lịch làm việc
router.get('/',roleMiddleware(['doctor', 'staff', 'admin']), workHouseDoctorController.getAllWorkHouses);

//  Lấy một bản ghi lịch làm việc theo ID
router.get('/:id',roleMiddleware(['doctor', 'staff', 'admin']), workHouseDoctorController.getWorkHouseById);

//  Lấy một bản ghi lịch làm việc theo ID bác sĩ
router.get('/getByDoctorId/:id',roleMiddleware(['doctor', 'staff', 'admin']), workHouseDoctorController.getWorkHouseByDoctorId);

module.exports = router;
