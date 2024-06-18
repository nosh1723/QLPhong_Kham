const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Tên chi nhánh
    address: { type: String, required: true }, // Địa chỉ
    phoneNumber: { type: String, required: true }, // Số điện thoại
    code: { type: String, required: true, unique: true } // Mã chi nhánh
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
