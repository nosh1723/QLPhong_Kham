const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const roleMiddleware = require('../middleware/roleMiddleware')

// Route để tạo mới một dịch vụ
router.post('/',roleMiddleware(['doctor', 'staff']), serviceController.createService);

// Route để lấy tất cả các dịch vụ
router.get('/', serviceController.getAllServices);

// Route để lấy tất cả các dịch vụ trong cate
router.get('/allServiceByCate', serviceController.getAllServicesByCate);

// Route để lấy thông tin của một dịch vụ theo ID
router.get('/:id', serviceController.getServiceById);

// Route để cập nhật thông tin của một dịch vụ theo ID
router.put('/:id',roleMiddleware(['doctor', 'staff', 'admin']), serviceController.updateServiceById);

// Route để xóa một dịch vụ theo ID
router.delete('/:id',roleMiddleware(['doctor', 'staff', 'admin']), serviceController.deleteServiceById);

router.get('/servicesCategoryById/:id', serviceController.getServiceCatogeryById)

module.exports = router;
