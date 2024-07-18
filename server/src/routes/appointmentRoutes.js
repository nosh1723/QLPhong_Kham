const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const roleMiddleware = require('../middleware/roleMiddleware')

// Route để đặt lịch hẹn
router.post('/book', appointmentController.bookAppointment);

// Route để tìm lịch hẹn bằng _id
router.get('/:id', appointmentController.findAppointmentById);

// get all lịch hẹn
router.post('/search-by-page', appointmentController.getAllAppontment)

router.post('/checkDateTime', appointmentController.checkDateTime)

router.post('/cancelAppointment', appointmentController.cancelAppointment)

module.exports = router;
