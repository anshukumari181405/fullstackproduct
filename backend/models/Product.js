const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {type : String, required: true},
    description: {type: String, required: true},
    price: {type : Number, required: true},
    oldPrice: {type: Number},
    rating: {type: Number},
    inStock: {type: Number},
    image: {type: String},
    category: {type: String}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;