const Patient = require('../models/Patient');
const Counter = require('../models/Counter');
const { getCode } = require('../LocalFunction');

// Hàm tạo mã bệnh nhân theo định dạng "000000"
// const generatePatientCode = async () => {
//     const counter = await Counter.findOneAndUpdate(
//         { name: 'patientCode' },
//         { $inc: { count: 1 } },
//         { new: true, upsert: true }
//     );
//     const code = counter.count.toString().padStart(6, '0');
//     return code;
// };

// Tạo mới bệnh nhân
exports.createOrUpdatePatient = async (req, res) => {
    try {
        const {
            _id,
            name,
            gender,
            health_insurance_code,
            health_insurance_start_date,
            health_insurance_end_date,
            payment_type,
            birth_date,
            address,
            ethnic,
            email,
            phone_number,
            user_id
        } = req.body;

        if(_id) {
            const updatedPatient = await Patient.findByIdAndUpdate(_id, {
                name,
                code: req.body.code,
                gender,
                health_insurance_code,
                health_insurance_start_date,
                health_insurance_end_date,
                payment_type,
                birth_date,
                address,
                ethnic,
                email,
                phone_number,
                user_id
            }, { new: true });
    
            if (!updatedPatient) {
                return res.status(404).json({ error: 'Không tìm thấy bệnh nhân để cập nhật' });
            }
    
            return res.status(200).json(updatedPatient);
        }

        // Tạo mã bệnh nhân tự động
        const patient = await Patient.find()
        const code = getCode(patient, 'BN')

        const newPatient = new Patient({
            name,
            code,
            gender,
            health_insurance_code,
            health_insurance_start_date,
            health_insurance_end_date,
            payment_type,
            birth_date,
            address,
            ethnic,
            email,
            phone_number,
            user_id
        });

        await newPatient.save();
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Lấy tất cả bệnh nhân
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Lấy bệnh nhân theo ID
exports.getPatientById = async (req, res) => {
    try {
        const {id} = req.params
        const patient = await Patient.findOne({user_id: id});
        if (!patient) {
            return res.status(404).json({ error: 'Không tìm thấy bệnh nhân' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Cập nhật bệnh nhân theo ID
// exports.updatePatientById = async (req, res) => {
//     try {
//         const {
//             name,
//             code,
//             gender,
//             health_insurance_code,
//             health_insurance_start_date,
//             health_insurance_end_date,
//             payment_type,
//             birth_date,
//             address,
//             ethnic,
//             email,
//             phone_number,
//             branch_id
//         } = req.body;

//         const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, {
//             name,
//             code,
//             gender,
//             health_insurance_code,
//             health_insurance_start_date,
//             health_insurance_end_date,
//             payment_type,
//             birth_date,
//             address,
//             ethnic,
//             email,
//             phone_number,
//             branch_id
//         }, { new: true });

//         if (!updatedPatient) {
//             return res.status(404).json({ error: 'Không tìm thấy bệnh nhân để cập nhật' });
//         }

//         res.status(200).json(updatedPatient);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// Xóa bệnh nhân theo ID
exports.deletePatientById = async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) {
            return res.status(404).json({ error: 'Không tìm thấy bệnh nhân để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa bệnh nhân thành công' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
