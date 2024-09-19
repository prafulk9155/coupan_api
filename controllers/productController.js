const Product = require('../models/Product');
const Category = require('../models/Category');

// Create a new product
exports.createProduct = async (req, res) => {
  const { title,
    description,
    price,
    original_price,
    discount_percentage,
    deal_type,
    category,
    imageUrl,
    link, 
    is_active } = req.body.data; // Include show in the request

  try {
    const newProduct = new Product({ 
      title,
      description,
      price,
      original_price,
      discount_percentage,
      deal_type,
      category,
      imageUrl,
      link, 
      is_active: is_active !== undefined ? is_active : true // Default to true if not specified
    });
    await newProduct.save();
    res.status(201).json({error:false,message:"Product added successfully", data:newProduct});
  } catch (error) {
    res.status(500).json({ error:true,message: error.message });
  }
};


exports.addCategory = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: true, message: "Invalid request: 'data' is missing." });
  }

  const { title, value, description, is_active } = data;

  if (!title || !value || !description) {
    return res.status(400).json({ error: true, message: "Title, value, and description are required." });
  }

  try {
    const newCategory = new Category({ 
      title, 
      value, 
      description, 
      is_active: is_active !== undefined ? is_active : true 
    });

    await newCategory.save();
    res.status(201).json({ error: false, message: "Category added successfully", data: newCategory });
  } catch (error) {
    console.error("Error while adding category:", error); // Log the error for debugging
    res.status(500).json({ error: true, message: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ is_active: true });;
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error:true, message: 'Error while fetching products' });
  }
};
