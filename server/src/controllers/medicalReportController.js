const Appointment = require('../models/Appointment');
const MedicalReport = require('../models/MedicalReport');
const MedicalResult = require('../models/MedicalResult');

// Tạo báo cáo y tế
exports.createMedicalReport = async (req, res) => {
    try {
        const { appointmentId, reExamination, dateReExam, listResult } = req.body;

        // Tìm lịch hẹn theo ID
        const appointment = await Appointment.findById(appointmentId)
            .populate('doctorId')
            .populate('serviceId')
            .populate('patientId')
            .populate('workHourId');

        if (!appointment) {
            return res.status(404).json({ message: 'Lịch hẹn không tồn tại' });
        }

        // Tạo báo cáo y tế mới
        const medicalReport = new MedicalReport({
            appointmentId: appointmentId,
            reExamination: reExamination,
            dateReExam: dateReExam,
            listResult: listResult
        });

        // Lưu báo cáo y tế
        await medicalReport.save();

        res.status(201).json({ message: 'Tạo báo cáo y tế thành công', medicalReport });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// Lấy thông tin báo cáo y tế theo ID
exports.getMedicalReport = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm báo cáo y tế theo ID
        const medicalReport = await MedicalReport.findById(id)
            .populate({
                path: 'appointmentId',
                populate: [
                    { path: 'doctorId' },
                    { path: 'serviceId' },
                    { path: 'patientId' },
                    { path: 'workHourId' }
                ]
            })
            .populate({
                path: 'listResult',
                populate: {
                    path: 'medicalReportId'
                }
            });

        if (!medicalReport) {
            return res.status(404).json({ message: 'Báo cáo y tế không tồn tại' });
        }

        // Chuẩn bị dữ liệu cho giao diện
        const appointment = medicalReport.appointmentId;
        const reportData = {
            patientName: appointment.patientId.name,
            patientCode: appointment.patientId.code,
            patientBirthDate: appointment.patientId.birthDate,
            patientGender: appointment.patientId.gender,
            serialNumber: appointment.serialNumber,
            appointmentCode: appointment.code,
            appointmentDate: appointment.date.toLocaleDateString('vi-VN'),
            appointmentTime: appointment.workHourId.time,
            doctorName: appointment.doctorId.name,
            serviceName: appointment.serviceId.name,
            results: medicalReport.listResult.map(result => result.description),
            reExamination: medicalReport.reExamination,
            dateReExam: medicalReport.dateReExam ? medicalReport.dateReExam.toLocaleDateString('vi-VN') : null
        };

        res.status(200).json({ reportData });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// Xóa báo cáo y tế theo ID
exports.deleteMedicalReport = async (req, res) => {
    try {
        const { id } = req.params;

        // Xóa báo cáo y tế
        await MedicalReport.findByIdAndDelete(id);

        res.status(200).json({ message: 'Xóa báo cáo y tế thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};
