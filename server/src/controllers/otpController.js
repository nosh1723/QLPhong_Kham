
/*

const User = require('../models/User');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require('bcrypt');

// Chuyển đổi định dạng số điện thoại
function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.startsWith('0')) {
        return '+84' + phoneNumber.slice(1);
    }
    return phoneNumber;
}

// Gửi OTP qua eSMS.vn
exports.sendOTP = async (req, res) => {
    const { phoneNumber } = req.body;
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    // Tạo otp và gửi 
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 ký tự

    //Lưu OTP tạm thời trong csdl
    const newOTP = new OTP({ phoneNumber: formattedPhoneNumber, otp });
    await newOTP.save();

    try {
        const response = await axios.post('https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/', {
            ApiKey: process.env.ESMS_API_KEY,
            Content: `Mã OTP của bạn là ${otp}`,
            Phone: formattedPhoneNumber,
            SecretKey: process.env.ESMS_SECRET_KEY,
            Brandname: 'Baotrixemay',
            SmsType: "2",
            IsUnicode: '1', 
            Sandbox: '0',
            campaignid: '',
            RequestId: '',
            CallbackUrl: ''
        });

        console.log(response.data); // Log the response from the eSMS.vn API
        res.status(200).json({ message: 'OTP đã được gửi thành công' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Gửi OTP thất bại', error: error.message });
    }
};

// Xác minh OTP
exports.verifyOTP = async (req, res) => {
    const { phoneNumber, otp } = req.body;
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    try {
        const validOTP = await OTP.findOne({ phoneNumber: formattedPhoneNumber, otp });

        if (!validOTP) return res.status(400).json({ message: 'OTP không hợp lệ' });

        await User.updateOne({ phoneNumber: formattedPhoneNumber }, { $setOnInsert: { phoneNumber: formattedPhoneNumber } }, { upsert: true });

        const token = jwt.sign({ id: validOTP._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Xác minh OTP thành công', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


*/