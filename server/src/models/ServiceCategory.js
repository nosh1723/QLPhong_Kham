const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceCategorySchema = new Schema({
    code: { type: String, required: true,},
    name: { type: String, required: true },
    services: [{ type: String, ref: 'Service' }]  // Danh sách dịch vụ
}, {
    timestamps: true
});

module.exports = mongoose.model('ServiceCategory', ServiceCategorySchema);
