import express from "express";
import { 
  addProduct, 
  deleteProduct, 
  getAllProducts, 
  updateProduct, 
  getProduct 
} from "./product.controller.js";

const productsRouter = express.Router();

// Routes for managing products
productsRouter.post("/", addProduct);          // Add a new product
productsRouter.put("/", updateProduct);       // Update an existing product
productsRouter.delete("/", deleteProduct);    // Delete a product
productsRouter.get("/", getAllProducts);      // Get all products
productsRouter.get("/:id", getProduct);       // Get a product by ID

export default productsRouter;
