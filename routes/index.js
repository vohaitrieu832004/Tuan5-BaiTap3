const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

router.get('/', async (req, res) => {
  const products = await Product.find().populate('supplier');
  const suppliers = await Supplier.find();
  res.render('index', { products, suppliers });
});

module.exports = router;
