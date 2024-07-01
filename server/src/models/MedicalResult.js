const mongoose = require('mongoose');

const medicalResultSchema = new mongoose.Schema({
    medicalReportId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalReport', required: true },
    description: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('MedicalResult', medicalResultSchema);
