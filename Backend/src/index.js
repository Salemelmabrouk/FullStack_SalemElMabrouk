import express from 'express';
import cors from 'cors';
import productsRouter from './modules/products/product.routes.js';

const app = express();  // Initialize the app here first

app.use(cors());          // Enable CORS
app.use(express.json());  // Enable JSON parsing

// Use the products routes with the "/products" path
app.use('/products', productsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
