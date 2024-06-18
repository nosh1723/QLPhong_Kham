const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
    
    health_insurance_status: { type: String },
    visit_status: { type: String, },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    visit_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'VisitType' },
    number_order: { type: Number },
    code: { type: String },
    shift_work_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ShiftWork' },
    visit_date_time: { type: Date },
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
});

module.exports = mongoose.model('Visit', VisitSchema);
