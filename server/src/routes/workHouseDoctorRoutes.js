const express = require('express');
const router = express.Router();
const workHouseDoctorController = require('../controllers/workHouseDoctorController');
const roleMiddleware = require('../middleware/roleMiddleware')

//  Tạo mới một bản ghi lịch làm việc
router.post('/', workHouseDoctorController.createWorkHouse);

//  Cập nhật một bản ghi lịch làm việc theo ID
router.put('/:id', workHouseDoctorController.updateWorkHouse);

//  Xóa một bản ghi ,h làm việc theo ID
router.delete('/:id', workHouseDoctorController.deleteWorkHouse);

//  Lấy tất cả các bản ghi lịch làm việc
router.get('/', workHouseDoctorController.getAllWorkHouses);

//  Lấy một bản ghi lịch làm việc theo ID
router.get('/:id', workHouseDoctorController.getWorkHouseById);

//  Lấy một bản ghi lịch làm việc theo ID bác sĩ
router.get('/getByDoctorId/:id', workHouseDoctorController.getWorkHouseByDoctorId);

module.exports = router;
