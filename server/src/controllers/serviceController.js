const DoctorService = require('../models/DoctorService');
const Service = require('../models/Service');
const ServiceCategory = require('../models/ServiceCategory');

// Tạo một dịch vụ mới
exports.createService = async (req, res) => {
    try {
        const {  name, price, description, category_Id } = req.body;

        // Đối chiếu với id ở bên bangr service_category
        const category = await ServiceCategory.findById(category_Id);
        if (!category) {
            return res.status(400).json({ error: 'ID danh mục không hợp lệ' });
        }

        // Tạo đối tượng dịch vụ mới
        const newService = new Service({
            name,
            price,
            description,
            category_Id
        });

        // Lưu dịch vụ vào cơ sở dữ liệu
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//lấy tất cả dv
exports.getAllServices = async (req, res) => {
    try {
        // Lấy danh sách các dịch vụ và điền thông tin của danh mục dịch vụ
        const services = await Service.find()

        res.status(200).json(services);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Lấy tất cả các dịch vụ theo thể laoij
exports.getAllServicesByCate = async (req, res) => {
    try {
        // Lấy danh sách các dịch vụ và điền thông tin của danh mục dịch vụ
        const services = await (await Service.find().populate('category_Id'))
        const serviceCats = await ServiceCategory.find()

        const result = serviceCats.map(i => {
            const res = services.filter(s => {
                return s.category_Id._id + "" === i._id + ""
            })
            return {
                _id: i._id,
                name: i.name,
                services: res
            }
        })

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Lấy dịch vụ theo ID
exports.getServiceById = async (req, res) => {
    try {
        // Lấy dịch vụ theo ID và điền thông tin của danh mục dịch vụ
        const service = await Service.findById(req.params.id).populate('category_Id');
        if (!service) {
            return res.status(404).json({ error: 'Không tìm thấy dịch vụ' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Cập nhật dịch vụ theo ID
exports.updateServiceById = async (req, res) => {
    try {
        const {  name, price, description, category_Id } = req.body;

        // Validate the category_Id
        const category = await ServiceCategory.findById(category_Id);
        if (!category) {
            return res.status(400).json({ error: 'ID danh mục không hợp lệ' });
        }

        // Cập nhật thông tin dịch vụ
        const updatedService = await Service.findByIdAndUpdate(req.params.id, {
            name,
            price,
            description,
            category_Id
        }, { new: true });

        if (!updatedService) {
            return res.status(404).json({ error: 'Không tìm thấy dịch vụ để cập nhật' });
        }

        res.status(200).json(updatedService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Xóa dịch vụ theo ID
exports.deleteServiceById = async (req, res) => {
    try {
        // Xóa dịch vụ khỏi cơ sở dữ liệu
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) {
            return res.status(404).json({ error: 'Không tìm thấy dịch vụ để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa dịch vụ thành công' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// lấy dịch vụ theo cat Id
exports.getServiceCatogeryById = async (req, res) => {
    try {
        const {id} = req.params
        const serviceCatogery = await (await Service.find({category_Id: id}).populate("category_Id")).map(i => ({
            _id: i._id,
            name: i.name,
            price: i.price,
            description: i.description,
            category: i.category_Id
        }))
        res.status(200).json({ message: 'success', data: serviceCatogery });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//lấy service theo id doctor 
exports.getDoctorService = async (req, res) => {
    try {
        const {id} = req.params
        const doctorServive = await DoctorService.findOne({doctor_id: id})
        const service = await Service.find({category_Id: doctorServive.category_Id})
        console.log();
        
        res.status(200).json(service)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}