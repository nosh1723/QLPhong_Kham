const mongoose = require("mongoose");

// Schema cho bác sĩ
const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên bác sĩ
  birth_date: { type: Date, required: true }, // Ngày sinh
  gender: {
    type: String,
    required: true,
    enum: ["M", "F"], // Giới tính chỉ có thể là 'M' hoặc 'F'
  },
  year_of_experience: { type: Number, required: true }, // Số năm kinh nghiệm
  experience: { type: String }, // Kinh nghiệm
  code: { type: String, required: true, unique: true }, // Mã bác sĩ
  description: { type: String }, // Mô tả
  avatar: { type: String }, // Ảnh đại diện
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  }, // Mã chi nhánh
  user_id: { type: String },
});

// Virtual cho dịch vụ
DoctorSchema.virtual("services", {
  ref: "DoctorService",
  localField: "code",
  foreignField: "doctor_code",
  justOne: false, // Cho phép nhiều dịch vụ
});

DoctorSchema.set("toObject", { virtuals: true });
DoctorSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Doctor", DoctorSchema);
