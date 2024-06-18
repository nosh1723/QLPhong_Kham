/*
const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: parseInt(process.env.OTP_EXPIRATION) / 1000 }
});

const OTP = mongoose.model('OTP', OTPSchema);
module.exports = OTP;
*/