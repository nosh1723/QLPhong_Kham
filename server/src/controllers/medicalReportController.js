const { normalizeDate } = require("../LocalFunction");
const Appointment = require("../models/Appointment");
const MedicalReport = require("../models/MedicalReport");
const MedicalResult = require("../models/MedicalResult");

// Tạo báo cáo y tế
exports.createOrUpdateMedicalReport = async (req, res) => {
  try {
    const { appointmentId, reExamination, dateReExam, listResult, _id } = req.body;

    const dateReExamFomat = normalizeDate(dateReExam)
    let medicalReport

    // Tìm lịch hẹn theo ID
    const appointment = await Appointment.findByIdAndUpdate(
      { _id: appointmentId },
      { status: 3 },
      { new: true }
    )
      .populate("doctorId")
      .populate("serviceId")
      .populate("patientId")
      .populate("workHourId");

    if (!appointment) {
      return res.status(404).json({ message: "Lịch hẹn không tồn tại" });
    }

    if(_id !== '') {
      medicalReport = MedicalReport.findByIdAndUpdate(_id, {
        appointmentId: appointmentId,
        reExamination: reExamination,
        dateReExam: reExamination ? dateReExamFomat : null,
      });
      
      // lấy kq theo id báo cáo
      const newListResult = listResult?.map(i => ({
          description: i,
          medicalReportId: medicalReport._id,
      }))
  
      MedicalResult.updateMany(newListResult).then(data => {}).catch(err => console.log('loi luu medical result', err))
    }else {
      // Tạo báo cáo y tế mới
      medicalReport = new MedicalReport({
        appointmentId: appointmentId,
        reExamination: reExamination,
        dateReExam: reExamination ? dateReExamFomat : null,
      });
      // Lưu báo cáo y tế
      await medicalReport.save();
      
      // lấy kq theo id báo cáo
      const newListResult = listResult?.map(i => ({
          description: i?.description,
          medicalReportId: medicalReport._id,
      }))
  
      MedicalResult.insertMany(newListResult).then(data => {}).catch(err => console.log('loi luu medical result', err))

      res
      .status(201)
      .json({ message: "Tạo báo cáo y tế thành công", medicalReport });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};



// Lấy thông tin báo cáo y tế theo ID
exports.getMedicalReportByAppId = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm báo cáo y tế theo ID
    const medicalReport = await MedicalReport.findOne({appointmentId: id})
      .populate({
        path: "appointmentId",
        populate: [
          { path: "doctorId" },
          { path: "serviceId" },
          { path: "patientId" },
          { path: "workHourId" },
        ],
      })
      // .populate({
      //   path: "listResult",
      //   populate: {
      //     path: "medicalReportId",
      //   },
      // });

    if (!medicalReport) {
      return res.status(404).json({ message: "Báo cáo y tế không tồn tại" });
    }

    const medicalResult = await MedicalResult.find({medicalReportId: medicalReport._id})

    // Chuẩn bị dữ liệu cho giao diện
    const appointment = medicalReport.appointmentId;
    const reportData = {
      _id: medicalReport._id,
      appointment: {
        _id: appointment._id,
        date: appointment.date,
        code: appointment.code,
        note: appointment.note,
        status: appointment.status,
        serialNumber: appointment.serialNumber,
        doctor: appointment.doctorId,
        service: appointment.serviceId,
        patient: appointment.patientId,
        workhour: appointment.workHourId,
      },
      results: medicalResult,
      reExamination: medicalReport.reExamination,
      dateReExam: medicalReport.dateReExam 
    };

    res.status(200).json({ ...reportData });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Lấy thông tin báo cáo y tế theo ID
exports.getMedicalReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm báo cáo y tế theo ID
    const medicalReport = await MedicalReport.findById(id)
      .populate({
        path: "appointmentId",
        populate: [
          { path: "doctorId" },
          { path: "serviceId" },
          { path: "patientId" },
          { path: "workHourId" },
        ],
      })
      .populate({
        path: "listResult",
        populate: {
          path: "medicalReportId",
        },
      });

    if (!medicalReport) {
      return res.status(404).json({ message: "Báo cáo y tế không tồn tại" });
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
      appointmentDate: appointment.date.toLocaleDateString("vi-VN"),
      appointmentTime: appointment.workHourId.time,
      doctorName: appointment.doctorId.name,
      serviceName: appointment.serviceId.name,
      results: medicalReport.listResult.map((result) => result.description),
      reExamination: medicalReport.reExamination,
      dateReExam: medicalReport.dateReExam
        ? medicalReport.dateReExam.toLocaleDateString("vi-VN")
        : null,
    };

    res.status(200).json({ reportData });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Xóa báo cáo y tế theo ID
exports.deleteMedicalReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Xóa báo cáo y tế
    await MedicalReport.findByIdAndDelete(id);

    res.status(200).json({ message: "Xóa báo cáo y tế thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

exports.getALLMedicalReport = async(req, res) => {
  try {
    console.log(1);
    const medicalReport = await MedicalReport.find()
    .populate({
      path: "appointmentId",
      populate: [
        { path: "doctorId" },
        { path: "serviceId" },
        { path: "patientId" },
        { path: "workHourId" },
      ],
    })
    console.log(2);

    if (!medicalReport) {
      return res.status(404).json({ message: "Báo cáo y tế không tồn tại" });
    }

    const medicalResult = await MedicalResult.find()
    // Chuẩn bị dữ liệu cho giao diện
    const reportData = medicalReport.map(i => {
      const appointment = i?.appointmentId;
      return {
        appointment: {
          _id: appointment._id,
          date: appointment.date,
          code: appointment.code,
          note: appointment.note,
          status: appointment.status,
          serialNumber: appointment.serialNumber,
          doctor:appointment.doctorId,
          service: appointment.serviceId,
          patient: appointment.patientId,
          workhour: appointment.workHourId
        },
        results: medicalResult.filter(j => j.medicalReportId + "" === i._id + ""),
        reExamination: medicalReport.reExamination,
        dateReExam: medicalReport.dateReExam 
      };
    })
    res.status(200).json(reportData);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
}
