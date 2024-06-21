const mongoose = require('mongoose');

// Định nghĩa Schema cho bảng dữ liệu lịch làm việc của bác sĩ
const WorkHouseDoctorSchema = new mongoose.Schema({
    doctorId: { type: String, ref: 'Doctor', required: true }, // ID của bác sĩ
    workHourId: { type: String, ref: 'WorkHour', required: true }, // ID của bác sĩ
    // dayOfWeek: { type: Number, required: true }, // Ngày trong tuần: 0 cho Chủ Nhật, 1 cho Thứ Hai, ..., 6 cho Thứ Bảy
    // startTime: { type: Date, required: true }, // Thời gian bắt đầu làm việc
    // endTime: { type: Date, required: true }, // Thời gian kết thúc làm việc
    // isFullDay: { type: Boolean, default: false } // Có phải làm cả ngày hay không
});

module.exports = mongoose.model('WorkHouseDoctor', WorkHouseDoctorSchema);
