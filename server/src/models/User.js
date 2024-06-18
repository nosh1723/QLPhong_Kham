const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Định nghĩa schema người dùng
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ['user', 'admin', 'doctor', 'staff'], default: 'user' },
    token : { type: String },

});

// Mã hóa mật khẩu trước khi lưu
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
