const Doctor = require("../models/Doctor");
const Branch = require("../models/Branch");
const DoctorService = require("../models/DoctorService");
const { getCode } = require("../LocalFunction");

//Hàm tạo 1 bác sĩ
createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.find();
    const code = getCode(doctor, "BS");

    const newDoctor = new Doctor({ ...req.body, code });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error("Lỗi khi tạo bác sĩ:", error);
    res.status(500).json({ message: "Lỗi khi tạo bác sĩ" });
  }
};

// Hàm để lấy danh sách tất cả các bác sĩ kèm thông tin chi nhánh và dịch vụ
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()

    // Lấy danh sách chi nhánh từ cơ sở dữ liệu
    const branches = await Branch.find();

    const doctorService = await DoctorService.find()

    // Tạo mảng để lưu thông tin chi tiết của từng bác sĩ kèm chi nhánh
    const doctorsWithBranchDetails = doctors.map((doctor) => {
      const branch = branches.find((b) => b._id.equals(doctor.branch_id));
      let branchDetails = null;
      if (branch) {
        branchDetails = {
          id: branch._id,
          code: branch.code,
          name: branch.name,
          address: branch.address,
        };
      }
      const service = doctorService.find(i => i.doctor_id + "" === doctor._id + "")

      return {
        ...doctor.toObject(),
        branch: branchDetails,
        categoryService: service
      };
    });

    res.json(doctorsWithBranchDetails);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bác sĩ:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

// Hàm để lấy thông tin chi tiết của bác sĩ theo ID, bao gồm chi tiết chi nhánh và dịch vụ
const getDoctorById = async (req, res) => {
  try {
    let doctor = await Doctor.findOne({ _id: req.params.id }).populate({
      path: "services",
      populate: {
        path: "service",
        model: "Service",
        select: "code name",
      },
    });

    if(!doctor) {
        doctor = await Doctor.findOne({ user_id: req.params.id }).populate({
            path: "services",
            populate: {
              path: "service",
              model: "Service",
              select: "code name",
            },
          });
    }

    if (!doctor) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    }

    // Lấy chi tiết chi nhánh của bác sĩ
    const branch = await Branch.findOne({ _id: doctor.branch_id });
    let branchDetails = null;
    if (branch) {
      branchDetails = {
        id: branch._id,
        code: branch.code,
        name: branch.name,
        address: branch.address,
      };
    }

    const doctorInfo = doctor.toObject();

    const doctorWithDetails = {
      id: doctorInfo._id,
      code: doctorInfo.code,
      name: doctorInfo.name,
      birthDate: doctorInfo.birth_date,
      gender: doctorInfo.gender,
      yearOfExperience: doctorInfo.year_of_experience,
      experience: doctorInfo.experience,
      description: doctorInfo.description,
      avatar: doctorInfo.avatar,
      services: doctorInfo.services,
      branch: branchDetails,
      user_id: doctorInfo.user_id
    };

    res.status(200).json(doctorWithDetails);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin bác sĩ theo mã:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
};
