const MedicalReport = require('../models/MedicalReport');
const Visit = require('../models/Visit');
const Patient = require('../models/Patient');

exports.createMedicalReport = async (req, res) => {
    const { visit_id, patient_id, name, date, service, status, return_visit_date, medicalResults, reExamination, dateReExam } = req.body;
    try {
        const medicalReport = new MedicalReport({
            visit_id,
            patient_id,
            name,
            date,
            service,
            status,
            return_visit_date,
            medicalResults,
            reExamination,
            dateReExam: reExamination ? dateReExam : null
        });
        await medicalReport.save();

        res.status(201).json(medicalReport);
    } catch (error) {
        console.error('Lỗi khi tạo báo cáo y tế:', error);
        res.status(500).json({ error: 'Lỗi khi tạo báo cáo y tế' });
    }
};

exports.getMedicalReport = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalReport = await MedicalReport.findById(id)
            .populate('visit_id')
            .populate('patient_id')
            .populate('medicalResults');
        if (!medicalReport) {
            return res.status(404).json({ error: 'Không tìm thấy báo cáo y tế' });
        }

        res.status(200).json(medicalReport);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin báo cáo y tế:', error);
        res.status(500).json({ error: 'Lỗi khi lấy thông tin báo cáo y tế' });
    }
};

exports.getMedicalReportByPatientId = async (req, res) => {
    const { patient_id } = req.params;
    try {
        const medicalReports = await MedicalReport.find({ patient_id })
            .populate('visit_id')
            .populate('patient_id')
            .populate('medicalResults');
        if (!medicalReports || medicalReports.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy báo cáo y tế' });
        }

        res.status(200).json(medicalReports);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin báo cáo y tế theo ID bệnh nhân:', error);
        res.status(500).json({ error: 'Lỗi khi lấy thông tin báo cáo y tế theo ID bệnh nhân' });
    }
};

exports.deleteMedicalReport = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalReport = await MedicalReport.findByIdAndDelete(id);
        if (!medicalReport) {
            return res.status(404).json({ error: 'Không tìm thấy báo cáo y tế' });
        }

        res.status(200).json({ message: 'Xóa báo cáo y tế thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa báo cáo y tế:', error);
        res.status(500).json({ error: 'Lỗi khi xóa báo cáo y tế' });
    }
};
