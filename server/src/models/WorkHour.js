const mongoose = require('mongoose');

const WorkHourSchema = new mongoose.Schema({
    
    title: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    typeShiftWork: { type: Number, required: true, enum: [1, 2] },
});

module.exports = mongoose.model('WorkHour', WorkHourSchema);
