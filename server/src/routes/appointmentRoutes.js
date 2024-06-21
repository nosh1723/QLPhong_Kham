const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Route để đặt lịch hẹn
router.post('/book', appointmentController.bookAppointment);

// Route để tìm lịch hẹn bằng _id
router.get('/:id', appointmentController.findAppointmentById);

router.post('/checkDateTime', appointmentController.checkDateTime)

module.exports = router;
