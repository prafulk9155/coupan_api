const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  const { title, imageUrl, link, show } = req.body.data; // Include show in the request

  try {
    const newProduct = new Product({ 
      title, 
      imageUrl, 
      link, 
      show: show !== undefined ? show : true // Default to true if not specified
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error while creating product' });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ show: true });;
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching products' });
  }
};
