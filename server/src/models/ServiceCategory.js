const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceCategorySchema = new Schema({
    name: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('ServiceCategory', ServiceCategorySchema);
