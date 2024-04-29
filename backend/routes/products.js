const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

//GET all Products
router.get('/', async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    } catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'});
    }
});

//Post a new product
router.post('/', async (req, res) => {
    const {title, description, price, oldPrice, rating, inStock, image, category} = req.body;
    try{
        const newProduct = new Product({
            title,
            description,
            price,
            oldPrice,
            rating,
            inStock,
            image,
            category
        });
        const product = await newProduct.save();
        res.status(201).json(product);

    } catch (err){
        console.error(err);
        res.status(500).json({message:'Server error'});
    }
});
module.exports = router;