const mongoose = require('mongoose');

// Schema cho hóa đơn
const InvoiceSchema = new mongoose.Schema({
    
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
