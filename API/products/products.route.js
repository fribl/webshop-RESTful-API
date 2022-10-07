import express from 'express'
import { getAllProducts, getProduct, getProductsByCategory, getCategories, getProductByCategory } from './products.controler.js'

export const productRouter = express.Router();

// middleware 
productRouter.use(express.json())

// route handlers

// get all products
productRouter.get("/products", getAllProducts);

//get a list of categories
productRouter.get("/products/categories", getCategories);

//get the product categories:
productRouter.get("/products/:category", getProductsByCategory);

//get all details about one product
productRouter.get("/products/product/:id", getProduct);

//get one product from a category 
productRouter.get("/products/:category/:id", getProductByCategory);


