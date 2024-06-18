const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category_Id: { type: Schema.Types.ObjectId, required: true, ref: 'ServiceCategory' }  
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', ServiceSchema);
