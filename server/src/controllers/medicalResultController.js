const MedicalResult = require('../models/MedicalResult');

exports.createMedicalResult = async (req, res) => {
    const { medicalReportId, description } = req.body;
    try {
        const medicalResult = new MedicalResult({ medicalReportId, description });
        await medicalResult.save();
        res.status(201).json(medicalResult);
    } catch (error) {
        console.error('Lỗi khi tạo kết quả y tế:', error);
        res.status(500).json({ error: 'Lỗi khi tạo kết quả y tế' });
    }
};

exports.getMedicalResult = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalResult = await MedicalResult.findById(id).populate('medicalReportId');
        if (!medicalResult) {
            return res.status(404).json({ error: 'Không tìm thấy kết quả y tế' });
        }
        res.status(200).json(medicalResult);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin kết quả y tế:', error);
        res.status(500).json({ error: 'Lỗi khi lấy thông tin kết quả y tế' });
    }
};

exports.deleteMedicalResult = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalResult = await MedicalResult.findByIdAndDelete(id);
        if (!medicalResult) {
            return res.status(404).json({ error: 'Không tìm thấy kết quả y tế' });
        }
        res.status(200).json({ message: 'Xóa kết quả y tế thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa kết quả y tế:', error);
        res.status(500).json({ error: 'Lỗi khi xóa kết quả y tế' });
    }
};
