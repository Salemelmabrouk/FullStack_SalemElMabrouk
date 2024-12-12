import fs from "fs";
import path from "path";

// Resolve the path to the 'products.json' file inside the 'data' folder at the root level
const productsFilePath = path.resolve("data/products.json");  // Relative to the project root

// Helper function to ensure the products.json file exists
const ensureFileExists = () => {
  if (!fs.existsSync(productsFilePath)) {
    // If the file doesn't exist, create an empty file with an empty array
    fs.writeFileSync(productsFilePath, JSON.stringify([]));
  }
};

// Helper function to read products from the file
const readProductsFromFile = () => {
  ensureFileExists(); // Ensure the file exists before reading
  const data = fs.readFileSync(productsFilePath, "utf-8");
  return JSON.parse(data);
};

// Helper function to write products to the file
const writeProductsToFile = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

// Add a product
export const addProduct = async (req, res) => {
  const { name, price, thumbnail } = req.body;
  try {
    const products = readProductsFromFile();
    const newProduct = {
      _id: (products.length + 1).toString(),
      name,
      price,
      thumbnail,
    };
    products.push(newProduct);
    writeProductsToFile(products);
    res.json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { name, price, thumbnail, _id } = req.body;
  try {
    const products = readProductsFromFile();
    const productIndex = products.findIndex((p) => p._id === _id);

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    products[productIndex] = { _id, name, price, thumbnail };
    writeProductsToFile(products);
    res.json({ message: "Product updated successfully", product: products[productIndex] });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { _id } = req.body;
  try {
    const products = readProductsFromFile();
    const productIndex = products.findIndex((p) => p._id === _id);

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    products.splice(productIndex, 1);
    writeProductsToFile(products);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = readProductsFromFile();
    res.json({ message: "Success", products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a single product by ID
export const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const products = readProductsFromFile();
    const product = products.find((p) => p._id === id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Success", product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};
