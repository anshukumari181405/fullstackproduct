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
// PUT update a product by ID
router.put('/:id', async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // DELETE a product by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
module.exports = router;