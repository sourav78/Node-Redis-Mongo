import mongoose from 'mongoose';

// Define the Product Schema
const productSchema = new mongoose.Schema(
  {
    /**
     * The main name of the product.
     */
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      trim: true, // Removes whitespace from start and end
    },

    /**
     * A detailed description of the product.
     */
    description: {
      type: String,
      trim: true,
    },

    /**
     * The base price of the product.
     */
    price: {
      type: Number,
      required: [true, 'Product price is required.'],
      min: [0, 'Price cannot be negative.'],
    },

    /**
     * The product category (e.g., "laptop", "mobile", "shoes").
     * Indexing this field improves query performance for filtering by category.
     */
    category: {
      type: String,
      required: [true, 'Product category is required.'],
      trim: true,
      lowercase: true
    },

    /**
     * The brand of the product (e.g., "HP", "Apple", "Nike").
     * Also indexed for faster brand-specific searches.
     */
    brand: {
      type: String,
      required: [true, 'Product brand is required.'],
      trim: true
    },

    /**
     * The URL for the main product image.
     */
    image_url: {
      type: String,
      required: [true, 'Product image URL is required.'],
    },

    /**
     * The number of items available in stock.
     */
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required.'],
      min: [0, 'Stock cannot be negative.'],
      default: 0,
    },

    /**
     * The product rating, out of 5.
     * Note: Your data contains an anomaly (rating: 42), which this schema
     * would cap at 5. You may need to clean your source data.
     */
    ratting: {
      type: Number,
      min: [0, 'Rating cannot be negative.'],
      max: [5, 'Rating cannot be greater than 5.'],
      default: 0,
    },

    /**
     * The discount percentage (e.g., 16 for 16%).
     */
    discount: {
      type: Number,
      min: [0, 'Discount cannot be negative.'],
      max: [100, 'Discount cannot be over 100%.'],
      default: 0,
    },

    /**
     * An optional array of color hex codes or names.
     * This will only be present for products like 'shoes'.
     */
    colors: {
      type: [String],
      default: undefined, // Will not be created if no colors are provided
    },

    /**
     * A flexible field to store all other category-specific details.
     * This uses a Mongoose 'Map' to store key-value pairs.
     * This is where fields like "Ram & Rom", "Display", "Camera",
     * "Processor", "Battery", "weight", "quantity", and "type" will be stored.
     */
    specifications: {
      type: Map,
      of: String,
      default: undefined,
    },
  },
  {
    /**
     * Automatically adds `createdAt` and `updatedAt` fields to the documents.
     */
    timestamps: true,
  }
);

// Create the Mongoose model from the schema
const Product = mongoose.model('products', productSchema);

// Export the model
export default Product;