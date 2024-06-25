const mongoose = require('mongoose');

// Schema cho lịch hẹn
const AppointmentSchema = new mongoose.Schema({
    doctorId: { type: String, required: true, ref: 'Doctor' }, // ID bác sĩ
    serviceId: { type: String, required: true, ref: 'Service' }, // ID dịch vụ
    patientId: { type: String, required: true, ref: 'Patient' }, // ID bệnh nhân
    workHourId: { type: String, required: true, ref: 'WorkHour' }, // ID giờ làm
    date: { 
        type: Date, 
        required: true, 
     }, // Ngày hẹn
    note: {type: String},
    status: { type: Number }, // Trạng thái lịch hẹn
    code: {type: String},
    serialNumber: {type: Number, required: true},
    createdAt: { type: Date, default: Date.now } // Ngày tạo
});

AppointmentSchema.pre('save', function (next) {
    const date = this.date;
    date.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây và mili giây về 0
    date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
    next();
  });

module.exports = mongoose.model('Appointment', AppointmentSchema);
