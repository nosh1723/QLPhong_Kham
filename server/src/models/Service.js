const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category_Id: { type: String, required: true, ref: 'ServiceCategory' }  
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', ServiceSchema);
