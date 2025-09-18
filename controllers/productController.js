const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.list = async (req, res) => {
  const filter = {};
  if (req.query.supplier) filter.supplier = req.query.supplier;
  if (req.query.q) filter.name = new RegExp(req.query.q, 'i');

  const products = await Product.find(filter).populate('supplier');
  const suppliers = await Supplier.find();
  res.render('products/index', { products, suppliers });
};

exports.createForm = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('products/form', { product: {}, suppliers });
};

exports.create = async (req, res) => {
  await Product.create(req.body);
  res.redirect('/products');
};

exports.editForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render('products/form', { product, suppliers });
};

exports.update = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/products');
};

exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};
