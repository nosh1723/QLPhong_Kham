const MedicalHistory = require('../models/MedicalHistory');
const Visit = require('../models/Visit');

exports.createMedicalHistory = async (req, res) => {
    const { result, visit_id } = req.body;
    try {
        const medicalHistory = new MedicalHistory({
            result,
            visit_id
        });
        await medicalHistory.save();

        res.status(201).json(medicalHistory);
    } catch (error) {
        console.error('Lỗi khi tạo hồ sơ bệnh án:', error);
        res.status(500).json({ error: 'Lỗi khi tạo hồ sơ bệnh án' });
    }
};


exports.getMedicalHistory = async (req, res) => {
    const { visit_id } = req.params;
    try {
        const medicalHistory = await MedicalHistory.findOne({ visit_id }).populate('visit_id');
        if (!medicalHistory) {
            return res.status(404).json({ error: 'Không tìm thấy hồ sơ bệnh án' });
        }

        res.status(200).json(medicalHistory);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin hồ sơ bệnh án:', error);
        res.status(500).json({ error: 'Lỗi khi lấy thông tin hồ sơ bệnh án' });
    }
};


exports.deleteMedicalHistory = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalHistory = await MedicalHistory.findByIdAndDelete(id);
        if (!medicalHistory) {
            return res.status(404).json({ error: 'Không tìm thấy hồ sơ bệnh án' });
        }

        res.status(200).json({ message: 'Xóa hồ sơ bệnh án thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa hồ sơ bệnh án:', error);
        res.status(500).json({ error: 'Lỗi khi xóa hồ sơ bệnh án' });
    }
};
