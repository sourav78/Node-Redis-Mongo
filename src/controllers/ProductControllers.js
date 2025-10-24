import mongoose from "mongoose";
import Product from "../db/ProductSchema.js";

export const getAllProducts = async (req, res) => {
  try {
    // 2. Use Product.find({}) to find all documents
    // An empty object {} means "match everything"
    const products = await Product.find({});

    // 3. Send the found products as a JSON response
    res.status(200).json(products);

  } catch (error) {
    // 4. Handle any potential errors
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Server Error: Could not fetch products' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    // A. Check if the ID format is valid *before* querying
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid Product ID format' });
    }

    // B. Find the product in the database
    const product = await Product.findById(productId);

    // C. Check if a product was found
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // D. Send the product if found
    res.status(200).json(product);

  } catch (error) {
    // E. Handle any other errors
    console.error('Error fetching product by ID:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}


export const createProduct = async (req, res) => {
  try {
    // req.body contains all the product data from the client
    const productData = req.body;

    // Check if a product with the same name already exists (optional but good)
    const existingProduct = await Product.findOne({ name: productData.name });
    if (existingProduct) {
      return res.status(400).json({ 
        message: `A product with the name "${productData.name}" already exists.` 
      });
    }

    // Create and save the new product
    // Mongoose will automatically validate req.body against your schema
    const newProduct = await Product.create(productData);

    // Send a 201 (Created) status with the new product
    res.status(201).json(newProduct);

  } catch (error) {
    // Handle validation errors (e.g., missing required fields)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', errors: error.errors });
    }
    // Handle other errors
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @route   PUT /api/products/:productId
 * @desc    Update an existing product by ID
 * @access  Private (You would typically protect this route)
 */
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    // 1. Check if the ID format is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid Product ID format' });
    }

    // 2. Find the product and update it
    // { new: true } returns the document *after* the update
    // { runValidators: true } ensures the update follows your schema rules
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    // 3. Check if a product was found and updated
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // 4. Send the updated product
    res.status(200).json(updatedProduct);

  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', errors: error.errors });
    }
    // Handle other errors
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // 1. Check if the ID format is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid Product ID format' });
    }

    // 2. Find the product by its ID and delete it
    // findByIdAndDelete() finds the doc and removes it atomically.
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // 3. Check if a product was found and deleted
    if (!deletedProduct) {
      // If deletedProduct is null, no product with that ID existed
      return res.status(404).json({ message: 'Product not found' });
    }

    // 4. Send a success response
    res.status(200).json({ 
      message: 'Product deleted successfully',
      deletedProduct: deletedProduct // Optionally send back the deleted item
    });

  } catch (error) {
    // 5. Handle any server errors
    console.error('Error deleting product:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};