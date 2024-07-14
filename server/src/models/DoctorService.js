const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorServiceSchema = new Schema({
    doctor_id: { type: String, ref: 'Doctor', required: true },
    category_Id: { type: String, ref: 'ServiceCategory', required: true }
});

module.exports = mongoose.model('DoctorService', DoctorServiceSchema);
