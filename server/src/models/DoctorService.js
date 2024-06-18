const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorServiceSchema = new Schema({
    doctor_id: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    service_id: { type: Schema.Types.ObjectId, ref: 'Service', required: true }
});

module.exports = mongoose.model('DoctorService', DoctorServiceSchema);
