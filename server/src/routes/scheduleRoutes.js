const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// Lấy danh sách tất cả các lịch làm việc
router.get('/', scheduleController.getAllSchedules);

// Lấy thông tin một lịch làm việc theo ID bác sĩ và ngày
router.get('/:doctorId/:date', scheduleController.getScheduleByDoctorIdAndDate);

// Lấy thông tin một lịch làm việc theo ID
router.get('/id/:id', scheduleController.getScheduleById);

module.exports = router;
