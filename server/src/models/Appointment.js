const mongoose = require('mongoose');

// Schema cho lịch hẹn
const AppointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Doctor' }, // ID bác sĩ
    branchId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Branch' }, // ID chi nhánh
    serviceId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Service' }, // ID dịch vụ
    patientId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Patient' }, //ID bệnh nhân
    date: { type: Date, required: true }, // Ngày hẹn
    time: { type: Date, required: true }, // Giờ hẹn
    status: { type: String, enum: ['Booked', 'Cancelled'], default: 'Booked' }, // Trạng thái lịch hẹn
    createdAt: { type: Date, default: Date.now }, // Ngày tạo
    price: { type: Number, required: true } // Giá dịch vụ
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
