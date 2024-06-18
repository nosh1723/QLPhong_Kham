const Schedule = require('../models/Schedule');

// Lấy danh sách tất cả các lịch làm việc
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().populate('doctor_id');
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Lấy thông tin một lịch làm việc theo ID bác sĩ và ngày
exports.getScheduleByDoctorIdAndDate = async (req, res) => {
    try {
        const schedule = await Schedule.findOne({
            doctor_id: req.params.doctorId,
            date: req.params.date
        }).populate('doctor_id');
        if (!schedule) {
            return res.status(404).json({ message: 'Không tìm thấy lịch làm việc' });
        }
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Lấy thông tin một lịch làm việc theo ID
exports.getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id).populate('doctor_id');
        if (!schedule) {
            return res.status(404).json({ message: 'Không tìm thấy lịch làm việc' });
        }
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};
