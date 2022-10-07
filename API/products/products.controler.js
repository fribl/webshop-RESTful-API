import * as productModel from "./products.model.js";

export async function getAllProducts(req, res) {
    try {
        let allProducts = await productModel.getAll();
        res.json(allProducts);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }


  // Get individual product by id
  export async function getProduct(req, res) {
    try {
      let id = parseInt(req.params.id);
      let product = await productModel.getByID(id);
      res.json(product);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  // Get products in a specific category
  export async function getProductsByCategory(req, res) {
    try {
      let category = req.params.category;
      let catArray = await productModel.getByCategory(category);
      res.json(catArray);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  // Get an array of the categories
  export async function getCategories(req, res) {
    try {
      let categories = await productModel.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(400).send(error.message);
    }
  
  }
//Get one product from a category
  export async function getProductByCategory(req, res) {
    try {
      let category = req.params.category;
      let id = parseInt(req.params.id);
      let product = await productModel.getProductFromCategory(category, id);
      res.json(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
//-----------------additional functions------------------
 //The following functions are not a requirement for project
 //adabted from lesson 8 solution, maybe useful later
    export async function putProduct (req, res) {
      try {
        let id = parseInt(req.params.id)
        let product = req.body;
        await productModel.update(id, product);
        res.end();
      } catch (error) {
        // res.statusMessage=
        res.status(400).send(error.message);
      }
    }

    export async function deleteProduct (req, res) {
      try {
        let id = parseInt(req.params.id)
        await productModel.remove(id);
        res.end();
      } catch (error) {
        // res.statusMessage=
        res.status(400).send(error.message);
      }
    }

    export async function postProduct(req, res) {
      try {
        let newProduct = req.body;
        await productModel.add(newProduct);
        res.end()
      } catch (error) {
        // res.statusMessage=
        res.status(400).send(error.message);
      }
    }
