const DoctorService = require('../models/DoctorService');

// Lấy danh sách tất cả các dịch vụ của bác sĩ
exports.getAllDoctorServices = async (req, res) => {
    try {
        const doctorServices = await DoctorService.find().populate('doctor_id').populate('service_id');
        res.json(doctorServices);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Lấy danh sách dịch vụ của một bác sĩ dựa trên ID bác sĩ
exports.getDoctorServicesByDoctorId = async (req, res) => {
    try {
        const doctorServices = await DoctorService.find({ doctor_id: req.params.doctorId }).populate('doctor_id').populate('service_id');
        res.json(doctorServices);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Lấy thông tin một dịch vụ theo ID
exports.getDoctorServiceById = async (req, res) => {
    try {
        const doctorService = await DoctorService.findById(req.params.id).populate('doctor_id').populate('service_id');
        if (!doctorService) {
            return res.status(404).json({ message: 'Không tìm thấy dịch vụ' });
        }
        res.json(doctorService);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};
