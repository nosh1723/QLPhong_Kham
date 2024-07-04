const WorkHouseDoctor = require('../models/WorkHouseDoctor');
const Appointment = require('../models/Appointment');
const { normalizeDate } = require('../LocalFunction');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Service = require('../models/Service');
const WorkHour = require('../models/WorkHour');

// Tạo mới một bản ghi lịch làm việc cho bác sĩ
exports.createWorkHouse = async (req, res) => {
    try {
        const { doctorId, dayOfWeek, startTime, endTime, isFullDay } = req.body;

        const workHouse = new WorkHouseDoctor({
            doctorId,
            dayOfWeek,
            startTime,
            endTime,
            isFullDay
        });

        await workHouse.save();

        res.status(201).json({ success: true, message: 'Đã tạo mới bản ghi lịch làm việc thành công.', workHouse });
    } catch (error) {
        console.error('Lỗi khi tạo mới bản ghi lịch làm việc:', error);
        res.status(500).json({ success: false, message: 'Không thể tạo mới bản ghi lịch làm việc.' });
    }
};

// Cập nhật một bản ghi lịch làm việc đã tồn tại
exports.updateWorkHouse = async (req, res) => {
    try {
        const { id } = req.params;
        const { dayOfWeek, startTime, endTime, isFullDay } = req.body;

        const updatedWorkHouse = await WorkHouseDoctor.findByIdAndUpdate(id, {
            dayOfWeek,
            startTime,
            endTime,
            isFullDay
        }, { new: true });

        if (!updatedWorkHouse) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy bản ghi lịch làm việc.' });
        }

        res.status(200).json({ success: true, message: 'Đã cập nhật bản ghi lịch làm việc thành công.', workHouse: updatedWorkHouse });
    } catch (error) {
        console.error('Lỗi khi cập nhật bản ghi lịch làm việc:', error);
        res.status(500).json({ success: false, message: 'Không thể cập nhật bản ghi lịch làm việc.' });
    }
};

// Xóa một bản ghi lịch làm việc đã tồn tại
exports.deleteWorkHouse = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedWorkHouse = await WorkHouseDoctor.findByIdAndDelete(id);

        if (!deletedWorkHouse) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy bản ghi lịch làm việc.' });
        }

        res.status(200).json({ success: true, message: 'Đã xóa bản ghi lịch làm việc thành công.', workHouse: deletedWorkHouse });
    } catch (error) {
        console.error('Lỗi khi xóa bản ghi lịch làm việc:', error);
        res.status(500).json({ success: false, message: 'Không thể xóa bản ghi lịch làm việc.' });
    }
};

// Lấy tất cả các bản ghi lịch làm việc
exports.getAllWorkHouses = async (req, res) => {
    try {
        const workHouses = await WorkHouseDoctor.find();

        res.status(200).json({ success: true, workHouses });
    } catch (error) {
        console.error('Lỗi khi lấy các bản ghi lịch làm việc:', error);
        res.status(500).json({ success: false, message: 'Không thể lấy các bản ghi lịch làm việc.' });
    }
};

// Lấy một bản ghi lịch làm việc theo ID
exports.getWorkHouseById = async (req, res) => {
    try {
        const { id } = req.params;
        const workHouse = await WorkHouseDoctor.findById(id);

        if (!workHouse) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy bản ghi lịch làm việc.' });
        }

        res.status(200).json({ success: true, workHouse });
    } catch (error) {
        console.error('Lỗi khi lấy bản ghi lịch làm việc theo ID:', error);
        res.status(500).json({ success: false, message: 'Không thể lấy bản ghi lịch làm việc.' });
    }
};

// Lấy lịch làm việc theo id doctor
exports.getWorkHouseDoctor = async(req, res) => {
    try {
        const {doctorId, date} = req.body

        const newDate = normalizeDate(date)

        const appointment = await Appointment.find({doctorId, date: newDate}) 

        if(!appointment) return res.status(404).json({message: 'Không tìm thấy lịch khám!'})

        const doctors = await Doctor.find()
        const patients = await Patient.find()
        const services = await Service.find()
        const workhours = await WorkHour.find()

        const result = appointment.map(i => {
            const doctor = doctors.find(item => item._id + "" === i.doctorId + "")
            const patient = patients.find(item => item._id + "" === i.patientId + "")
            const service = services.find(item => item._id + "" === i.serviceId + "")
            const workhour = workhours.find(item => item._id + "" === i.workHourId + "")
            return {
                _id: i._id,
                doctor,
                patient,
                service,
                workhour,
                date: i.date,
                code: i.code,
                note: i.note,
                status: i.status,
                serialNumber: i.serialNumber
            }
        })

        res.status(200).json(result)
    } catch (error) {
        console.log(err);
        res.status(500).json({success: false, message: 'Không thể lấy bản ghi lịch làm việc.'})
    }
}

// Lấy lịch làm việc theo id doctor //"old"
// exports.getWorkHouseByDoctorId = async(req, res) => {
//     try {
//         const {id} = req.params
//         const workHouse = await (await WorkHouseDoctor.find({doctorId: id}).populate("workHourId")).map(i => i.workHourId)
//         res.status(200).json(workHouse)
//     } catch (error) {
//         console.log(err);
//         res.status(500).json({success: false, message: 'Không thể lấy bản ghi lịch làm việc.'})
//     }
// }