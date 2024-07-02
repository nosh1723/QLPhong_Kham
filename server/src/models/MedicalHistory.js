const mongoose = require('mongoose');

const MedicalHistorySchema = new mongoose.Schema({
    result: { type: String, required: true },
    visit_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Visit', required: true },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    medicalReports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalReport' }]
});

module.exports = mongoose.model('MedicalHistory', MedicalHistorySchema);
