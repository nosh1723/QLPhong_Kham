const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

// Đặt lịch hẹn
exports.bookAppointment = async (req, res) => {
    try {
        const { doctorId, serviceId, patientId, date, time } = req.body;

        // Chỉ xét phần ngày của 'date' để kiểm tra tính khả dụng
        const appointmentDate = new Date(date);
        appointmentDate.setHours(0, 0, 0, 0);  // Đặt giờ về 00:00:00.000

        // Kiểm tra tính khả dụng của lịch hẹn
        const isSlotAvailable = await checkAppointmentAvailability(doctorId, appointmentDate, time);

        if (!isSlotAvailable) {
            return res.status(400).json({ success: 0, message: 'Đã có lịch hẹn khác vào thời điểm này.' });
        }

        // Đảm bảo doctorId, serviceId và patientId là ObjectId hợp lệ
        let doctorObjectId, serviceObjectId, patientObjectId;
        try {
            doctorObjectId = new mongoose.Types.ObjectId(doctorId);
            serviceObjectId = new mongoose.Types.ObjectId(serviceId);
            patientObjectId = new mongoose.Types.ObjectId(patientId);
        } catch (error) {
            console.error('Định dạng ID không hợp lệ:', error);
            return res.status(400).json({ success: 0, message: 'ID không hợp lệ.' });
        }

        // Truy vấn thông tin bác sĩ
        const doctor = await Doctor.findById(doctorObjectId);
        if (!doctor) {
            return res.status(404).json({ success: 0, message: 'Không tìm thấy bác sĩ.' });
        }

        // Truy vấn thông tin dịch vụ
        const service = await Service.findOne({ _id: serviceObjectId });
        if (!service) {
            return res.status(404).json({ success: 0, message: 'Không tìm thấy dịch vụ.' });
        }

        // Truy vấn thông tin bệnh nhân
        const patient = await Patient.findById(patientObjectId);
        if (!patient) {
            return res.status(404).json({ success: 0, message: 'Không tìm thấy bệnh nhân.' });
        }

        // Tạo mới lịch hẹn và lưu vào cơ sở dữ liệu
        const appointment = new Appointment({
            doctorId: doctorObjectId,
            serviceId: serviceObjectId,
            patientId: patientObjectId, // Gán patientId đã được truyền từ req.body
            date: appointmentDate,
            time
        });

        await appointment.save();

        // Trả về thông tin lịch hẹn đã được đặt thành công, bao gồm branch_id từ doctor và price từ service
        res.status(201).json({
            success: 1,
            message: 'Lịch hẹn đã được đặt thành công.',
            appointment: {
                ...appointment.toObject(),
                branchId: doctor.branch_id, // Lấy branch_id từ thông tin bác sĩ
                price: service.price // Lấy giá từ thông tin dịch vụ
            }
        });
    } catch (error) {
        console.error('Lỗi khi đặt lịch hẹn:', error);
        res.status(500).json({ success: 0, message: 'Đã xảy ra lỗi khi đặt lịch hẹn.' });
    }
};

// Hàm kiểm tra tính khả dụng của lịch hẹn
async function checkAppointmentAvailability(doctorId, date, time) {
    const existingAppointment = await Appointment.findOne({ doctorId, date, time });
    return !existingAppointment;
}

// Tìm lịch hẹn bằng _id
exports.findAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ success: 0, message: 'Lịch hẹn không tồn tại.' });
        }

        // Trả về thông tin lịch hẹn đã tìm thấy
        res.status(200).json({ success: 1, appointment });
    } catch (error) {
        console.error('Lỗi khi tìm kiếm lịch hẹn:', error);
        res.status(500).json({ success: 0, message: 'Đã xảy ra lỗi khi tìm kiếm lịch hẹn.' });
    }
};
