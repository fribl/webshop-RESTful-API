import express from 'express'
import { postCustomer, getCustomer, putProduct, getBasket, removeFromBasket } from './customers.controler.js'

export const customerRouter = express.Router();

// middleware
customerRouter.use(express.json())

// route handlers
customerRouter.post("/customers", postCustomer);

customerRouter.get("/customers/:id", getCustomer);

customerRouter.put("/customers/:id/basket/:productId", putProduct);

customerRouter.delete("/customers/:id/basket/:productId", removeFromBasket);

customerRouter.get("/customers/:id/basket", getBasket);

