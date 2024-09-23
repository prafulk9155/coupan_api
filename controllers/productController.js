const Product = require('../models/Product');
const upload = require('../middlewares/upload'); // Assuming you have an upload middleware set up

exports.addProduct = async (req, res) => {
  console.log("Request Body:", req.body);  // Log the request body
  console.log("Uploaded File:", req.file);  // Log uploaded file data

  // Check if the uploaded file exists
  if (!req.file) {
      return res.status(400).json({ error: true, message: "File upload is required." });
  }

  // Trim extra spaces from keys and destructure
  const {
      title,
      description,
      price,
      original_price,
      discount_percentage,
      deal_type,
      category,
      link,
  } = {
      title: req.body.title ? req.body.title.trim() : '',
      description: req.body.description ? req.body.description.trim() : '',
      price: req.body.price ? req.body.price.trim() : '',
      original_price: req.body.original_price ? req.body.original_price.trim() : '',
      discount_percentage: req.body.discount_percentage ? req.body.discount_percentage.trim() : '',
      deal_type: req.body.deal_type ? req.body.deal_type.trim() : '',
      category: req.body.category ? req.body.category.trim() : '',
      link: req.body.link ? req.body.link.trim() : '',
  };

  // Validate required fields
  if (!title || !description || !price || !category || !link) {
      return res.status(400).json({ error: true, message: "Required fields are missing." });
  }

  try {
      // Create a new product instance
      const newProduct = new Product({
          title,
          description,
          price,
          original_price: original_price || null,
          discount_percentage: discount_percentage || null,
          deal_type: deal_type || null,
          category,
          link,
          imageUrl: req.file.path, // Get the uploaded image path
          is_active: true, // Default to true
      });

      // Save the product to the database
      await newProduct.save();
      res.status(201).json({ error: false, message: "Product added successfully", data: newProduct });
  } catch (error) {
      console.error("Error while saving Product:", error);
      res.status(500).json({ error: true, message: error.message });
  }
};




// Get all Product
exports.getAllProduct = async (req, res) => {
    const { start , count } = req.body.data; // Get page and limit from query parameters

    try {
        const totalCount = await Product.countDocuments({ is_active: true }); // Get total count of active metadata
        const metadataList = await Product.find({ is_active: true })
            .skip((start ) * count) // Skip the number of documents based on the current page
            .limit(Number(count)); // Limit the number of documents returned

        res.status(200).json({
            error: false,
            data: metadataList,
            total_count: totalCount,
            current_page: start,
            total_pages: Math.ceil(totalCount / count) // Calculate total pages
        });
    } catch (error) {
        console.error("Error while fetching metadata list:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};


exports.updateProduct = async (req, res) => {
// Update Product (this will mark it as inactive)exports.updateProduct = async (req, res) => {
    const { id } = req.body.data; // Extract the ID from the request body
    const updateData = req.body.data; // Get the entire data to be updated

    try {
         
        updateData.updated_on = Date.now();
        updateData.updated_by = updateData.updated_by || "0"; // Default to "0" if not provided

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: updateData }, // Use $set to only update specific fields
            { new: true } // Return the newly updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: true, message: "Product not found." });
        }

        res.status(200).json({ error: false, message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.error("Error while updating metadata:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.body.data;

    try {
        const metadata = await Product.findById(id);
        if (!metadata ) {
            return res.status(404).json({ error: true, message: "Product not found ." });
        }
        res.status(200).json({ error: false, data: metadata });
    } catch (error) {
        console.error("Error while fetching metadata:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    const { id } = req.body.data;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { is_active: false, updated_on: Date.now(), updated_by: req.body.updated_by || "0" },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: true, message: "Product not found." });
        }

        res.status(200).json({ error: false, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error while updating metadata:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};