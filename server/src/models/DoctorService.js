const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorServiceSchema = new Schema({
    doctor_id: { type: String, ref: 'Doctor', required: true },
    service_id: { type: String, ref: 'Service', required: true }
});

module.exports = mongoose.model('DoctorService', DoctorServiceSchema);
