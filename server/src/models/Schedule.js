const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    time: { type: Date, required: true }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
