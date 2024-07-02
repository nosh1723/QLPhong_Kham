const mongoose = require('mongoose');

const MedicalReportSchema = new mongoose.Schema({
    visit_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Visit', required: true },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    service: { type: String, required: true },
    status: { type: Boolean, required: true },
    return_visit_date: { type: Date },
    medicalResults: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalResult' }]
});

module.exports = mongoose.model('MedicalReport', MedicalReportSchema);
