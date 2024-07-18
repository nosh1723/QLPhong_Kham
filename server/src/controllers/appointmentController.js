const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const WorkHouseDoctor = require("../models/WorkHouseDoctor");
const WorkHour = require("../models/WorkHour");
const { getCode, normalizeDate } = require("../LocalFunction");

// Hàm kiểm tra tính khả dụng của lịch hẹn
async function checkAppointmentAvailability(doctorId, date, time) {
  const existingAppointment = await Appointment.findOne({
    doctorId,
    date,
    time,
  });
  return !existingAppointment;
}

//get all lịch hẹn
exports.getAllAppontment = async (req, res) => {
  try {
    const {patientId} = req.body
    const nowDate = normalizeDate(new Date());
    const appointment = await Appointment.find({patientId});
    await Appointment.updateMany(
      { date: { $lt: nowDate }, status: 1 },
      { $set: { status: 2 } }
    );

    const doctors = await Doctor.find();
    const patients = await Patient.find();
    const services = await Service.find();
    const workhours = await WorkHour.find();

    const result = appointment.map((i) => {
      const doctor = doctors.find((item) => item._id + "" === i.doctorId + "");
      const patient = patients.find(
        (item) => item._id + "" === i.patientId + ""
      );
      const service = services.find(
        (item) => item._id + "" === i.serviceId + ""
      );
      const workhour = workhours.find(
        (item) => item._id + "" === i.workHourId + ""
      );
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
        serialNumber: i.serialNumber,
      };
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Lỗi khi lấy lịch hẹn:", error);
    res
      .status(500)
      .json({ success: 0, message: "Đã xảy ra lỗi khi lấy lịch hẹn." });
  }
};

// Đặt lịch hẹn
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, service, patientId, date, appointmentTime, note } =
      req.body;

    const appointment = await Appointment.find();

    const code = getCode(appointment, "AM");
    let serialNumber = 1;

    const newDate = normalizeDate(date);

    appointment.forEach((i) => {
      if (new Date(i.date).getTime() === new Date(newDate).getTime()) {
        if (i.serialNumber === serialNumber) serialNumber++;
        else if (i.serialNumber > serialNumber) serialNumber = i.serialNumber++;
      }
    });

    // Truy vấn thông tin bác sĩ
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: 0, message: "Không tìm thấy bác sĩ." });
    }

    // Truy vấn thông tin bệnh nhân
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res
        .status(404)
        .json({ success: 0, message: "Không tìm thấy bệnh nhân." });
    }

    // Tạo mới lịch hẹn và lưu vào cơ sở dữ liệu
    const newAppointment = new Appointment({
      doctorId,
      serviceId: service?._id,
      patientId, // Gán patientId đã được truyền từ req.body
      date: new Date(date),
      workHourId: appointmentTime?._id,
      note,
      code,
      status: 1,
      serialNumber: serialNumber,
    });

    await newAppointment.save();

    // Trả về thông tin lịch hẹn đã được đặt thành công, bao gồm branch_id từ doctor và price từ service
    res.status(201).json({
      message: "Lịch hẹn đã được đặt thành công.",
      appointment: {
        ...newAppointment.toObject(),
        service,
        patient,
        doctor,
        appointmentTime: {
          ...appointmentTime,
          startTime: new Date(appointmentTime?.startTime),
          endTime: new Date(appointmentTime?.endTime),
        },
        note,
        code,
      },
    });

    // Chỉ xét phần ngày của 'date' để kiểm tra tính khả dụng
    // const appointmentDate = new Date(date);
    // appointmentDate.setHours(0, 0, 0, 0);  // Đặt giờ về 00:00:00.000

    // // Kiểm tra tính khả dụng của lịch hẹn
    // const isSlotAvailable = await checkAppointmentAvailability(doctorId, appointmentDate, time);

    // if (!isSlotAvailable) {
    //     return res.status(400).json({ success: 0, message: 'Đã có lịch hẹn khác vào thời điểm này.' });
    // }

    // // Đảm bảo doctorId, serviceId và patientId là ObjectId hợp lệ
    // let doctorObjectId, serviceObjectId, patientObjectId;
    // try {
    //     doctorObjectId = new mongoose.Types.ObjectId(doctorId);
    //     serviceObjectId = new mongoose.Types.ObjectId(serviceId);
    //     patientObjectId = new mongoose.Types.ObjectId(patientId);
    // } catch (error) {
    //     console.error('Định dạng ID không hợp lệ:', error);
    //     return res.status(400).json({ success: 0, message: 'ID không hợp lệ.' });
    // }
  } catch (error) {
    console.error("Lỗi khi đặt lịch hẹn:", error);
    res
      .status(500)
      .json({ success: 0, message: "Đã xảy ra lỗi khi đặt lịch hẹn." });
  }
};

exports.checkDateTime = async (req, res) => {
  try {
    const { date } = req.body;

    const newDate = normalizeDate(date);

    const appointment = await Appointment.find({ date: newDate });
    const workhour = await WorkHour.find();
    if (!workhour)
      return res.status(400).json({ message: "workhour not exist!" });

    const newWorkhour = workhour.filter((i) => {
      const result = appointment.some((id) => id.workHourId === i._id + "");
      return result;
    });

    return res.status(200).json({ status: 1, workhour: newWorkhour });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi kiểm tra ngày đặt khám." });
  }
};

//hủy lịch hẹn
exports.cancelAppointment = async (req, res) => {
  try {
    const { _id } = req.body;
    const appointment = await Appointment.findOneAndUpdate(
      { _id: _id },
      { $set: { status: 0 } },
      { new: true }
    );
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi hủy lịch hẹn." });
  }
};

// Tìm lịch hẹn bằng _id
exports.findAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: 0, message: "Lịch hẹn không tồn tại." });
    }

    const doctor = await Doctor.findById(appointment.doctorId);
    const patient = await Patient.findById(appointment.patientId);
    const service = await Service.findById(appointment.serviceId);
    const workhour = await WorkHour.findById(appointment.workHourId);

    // Trả về thông tin lịch hẹn đã tìm thấy
    res.status(200).json({
      success: 1,
      appointment: {
        _id: appointment._id,
        doctor,
        patient,
        service,
        workhour,
        date: appointment.date,
        note: appointment.note,
        status: appointment.status,
        code: appointment.code,
        serialNumber: appointment.serialNumber,
      },
    });
  } catch (error) {
    console.error("Lỗi khi tìm kiếm lịch hẹn:", error);
    res
      .status(500)
      .json({ success: 0, message: "Đã xảy ra lỗi khi tìm kiếm lịch hẹn." });
  }
};
