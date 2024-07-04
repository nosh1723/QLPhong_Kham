const mongoose = require('mongoose');

const MedicalReportSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    reExamination: { type: Boolean, required: true },
    dateReExam: { type: Date },
    //listResult: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalResult' }] 
});

module.exports = mongoose.model('MedicalReport', MedicalReportSchema);
