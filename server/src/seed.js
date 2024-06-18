const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Service = require('./models/Service');
const Schedule = require('./models/Schedule');
const WorkHour = require('./models/WorkHour');
const DoctorService = require('./models/DoctorService');
const Branch = require('./models/Branch');
const usersData = require('./data/users.json'); 
const doctors = require('./data/doctors.json');
const services = require('./data/services.json');
const schedules = require('./data/schedules.json');
const workHours = require('./data/work_hours.json');
const doctorServices = require('./data/doctor_services.json');
const branches = require('./data/branches.json');
// Tải các biến môi trường từ tệp .env
dotenv.config();

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('Đã kết nối đến MongoDB');

    // Thêm chi nhánh
    for (const branch of branches) {
        try {
            const existingBranch = await Branch.findOne({ code: branch.code });
            if (!existingBranch) {
                await Branch.create(branch);
                console.log(`Đã thêm chi nhánh ${branch.code} thành công`);
            } else {
                await Branch.updateOne({ code: branch.code }, branch);
                console.log(`Đã cập nhật chi nhánh ${branch.code} thành công`);
            }
        } catch (error) {
            console.error('Lỗi khi thêm hoặc cập nhật chi nhánh:', error);
        }
    }

    // Thêm bác sĩ
    for (const doctor of doctors) {
        try {
            const existingDoctor = await Doctor.findOne({ code: doctor.code });
            if (!existingDoctor) {
                await Doctor.create(doctor);
                console.log(`Đã thêm bác sĩ ${doctor.code} thành công`);
            } else {
                await Doctor.updateOne({ code: doctor.code }, doctor);
                console.log(`Đã cập nhật bác sĩ ${doctor.code} thành công`);
            }
        } catch (error) {
            console.error('Lỗi khi thêm hoặc cập nhật bác sĩ:', error);
        }
    }

    // Thêm người dùng với mật khẩu đã được mã hóa
    for (const user of users) {
        try {
            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
                // Mã hóa mật khẩu trước khi lưu
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                user.password = hashedPassword;

                await User.create(user);
                console.log(`Đã thêm người dùng ${user.email} thành công`);
            } else {
                await User.updateOne({ email: user.email }, user);
                console.log(`Đã cập nhật người dùng ${user.email} thành công`);
            }
        } catch (error) {
            console.error('Lỗi khi thêm hoặc cập nhật người dùng:', error);
        }
    }

    // Thêm dịch vụ
    for (const service of services) {
        try {
            const existingService = await Service.findOne({ code: service.code });
            if (!existingService) {
                await Service.create(service);
                console.log(`Đã thêm dịch vụ ${service.code} thành công`);
            } else {
                await Service.updateOne({ code: service.code }, service);
                console.log(`Đã cập nhật dịch vụ ${service.code} thành công`);
            }
        } catch (error) {
            console.error('Lỗi khi thêm hoặc cập nhật dịch vụ:', error);
        }
    }

    // Thêm danh mục dịch vụ
    for (const serviceCategory of serviceCategories) {
        try {
            const existingServiceCategory = await ServiceCategory.findOne({ code: serviceCategory.code });
            if (!existingServiceCategory) {
                await ServiceCategory.create(serviceCategory);
                console.log(`Đã thêm danh mục dịch vụ ${serviceCategory.code} thành công`);
            } else {
                await ServiceCategory.updateOne({ code: serviceCategory.code }, serviceCategory);
                console.log(`Đã cập nhật danh mục dịch vụ ${serviceCategory.code} thành công`);
            }
        } catch (error) {
            console.error('Lỗi khi thêm hoặc cập nhật danh mục dịch vụ:', error);
        }
    }

    // Thêm lịch làm việc
    for (const schedule of schedules) {
        try {
            const existingSchedule = await Schedule.findOne({
                doctor_code: schedule.doctor_code,
                date: schedule.date
            });
            if (!existingSchedule) {
                await Schedule.create(schedule);
                console.log(`Đã thêm lịch làm việc cho bác sĩ ${schedule.doctor_code} vào ngày ${schedule.date} thành công`);
            } else {
                await Schedule.updateOne({
                    doctor_code: schedule.doctor_code,
                    date: schedule.date
                }, schedule);
                console.log(`Đã cập nhật lịch làm việc cho bác sĩ ${schedule.doctor_code} vào ngày ${schedule.date} thành công`);
            }
        } catch (error) {
            console.error('Lỗi khi thêm hoặc cập nhật lịch làm việc:', error);
        }
    }

    // Thêm giờ làm việc
    for (const workHour of workHours) {
        try {
            const existingWorkHour = await WorkHour.findOne({
                title: workHour.title,
                startTime: workHour.startTime,
                endTime: workHour.endTime,
                typeShiftWork: workHour.typeShiftWork
            });

            if (!existingWorkHour) {
                await WorkHour.create(workHour);
                console.log(`Đã thêm giờ làm việc ${workHour.title} từ ${workHour.startTime} đến ${workHour.endTime} thành công`);
            } else {
                await WorkHour.updateOne({
                    title: workHour.title,
                    startTime: workHour.startTime,
                    endTime: workHour.endTime,
                    typeShiftWork: workHour.typeShiftWork
                }, workHour);
                console.log(`Đã cập nhật giờ làm việc ${workHour.title} từ ${workHour.startTime} đến ${workHour.endTime} thành công`);
            }
        } catch (error) {
            console.error('Lỗi khi thêm hoặc cập nhật giờ làm việc:', error);
        }
    }

    // Thêm dữ liệu DoctorService
    for (const ds of doctorServices) {
        try {
            const doctor = await Doctor.findOne({ code: ds.doctor_code });
            const service = await Service.findOne({ code: ds.service_code });

            // Kiểm tra xem bác sĩ và dịch vụ có tồn tại không
            if (!doctor) {
                console.error(`Bác sĩ với mã ${ds.doctor_code} không tồn tại.`);
                continue;
            }

            if (!service) {
                console.error(`Dịch vụ với mã ${ds.service_code} không tồn tại.`);
                continue;
            }

            // Tạo một đối tượng DoctorService mới và lưu vào cơ sở dữ liệu
            const doctorService = new DoctorService({
                doctor_code: ds.doctor_code,
                service_code: ds.service_code,
            });

            await doctorService.save();
            console.log(`Đã thêm dữ liệu DoctorService cho bác sĩ ${ds.doctor_code} và dịch vụ ${ds.service_code} thành công`);
        } catch (error) {
            console.error('Lỗi khi thêm dữ liệu DoctorService:', error);
        }
    }

    console.log('Dữ liệu mẫu đã được thêm/cập nhật thành công');
    process.exit();
}).catch((err) => {
    console.error('Lỗi kết nối MongoDB:', err);
    process.exit(1);
});
