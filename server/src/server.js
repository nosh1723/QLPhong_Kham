require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const workHourRoutes = require('./routes/workHourRoutes');
const branchRoutes = require('./routes/branchRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes'); 
const patientRoutes = require('./routes/patientRoutes');
const workHouseDoctorRoutes = require('./routes/workHouseDoctorRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Middleware để phân tích cú pháp JSON
app.use(express.json());

// Kích hoạt CORS cho tất cả các route
app.use(cors());

// Định tuyến
app.use('/api/auth', authRoutes); 
app.use('/api/doctors', doctorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/workhours', workHourRoutes);
app.use('/api/branch', branchRoutes);
app.use('/api/appointments', appointmentRoutes); 
app.use('/api/patient', patientRoutes);
app.use('/api/workhouses', workHouseDoctorRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

// Kết nối tới MongoDB bằng chuỗi kết nối từ .env
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Đã kết nối đến MongoDB');
    app.listen(PORT, () => {
        console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
    });
}).catch((err) => {
    console.error(err);
});
