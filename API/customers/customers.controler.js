import * as customerModel from "./customers.model.js";

export async function getAllCustomers(req, res) {
    try {
        let allCustomers = await customerModel.getAllCustomers();
        res.json(allCustomers);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  //not necessary yet, copied from lecture 8
export async function postCustomer(req, res) {
    try {
      let newCustomer = req.body;
      await customerModel.add(newCustomer);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
  
  export async function getCustomer (req, res) {
    try {
      let id = parseInt(req.params.id)
      let customer = await customerModel.getByID(id);
      res.json(customer);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  //not necessary yet, copied from lecture 8
  export async function putCustomer  (req, res) {
    try {
      let id = parseInt(req.params.id)
      let customer = req.body;
      await customerModel.update(id, customer);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  //not necessary yet, copied from lecture 8
  export async function deleteCustomer (req, res) {
    try {
      let id = parseInt(req.params.id)
      await customerModel.remove(id);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  //-------------------BASKET FUNCTIONS------------------
  export async function getBasket (req, res) {
    try {
      let id = parseInt(req.params.id);
      let basket = await customerModel.getCustomerBasket(id);
      res.json(basket);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  
  export async function putProduct (req, res) {
    try {
      let customerId = parseInt(req.params.id);
      let productId = parseInt(req.params.productId);
      await customerModel.putInBasket(customerId, productId);
      res.send();
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  export async function removeFromBasket (req, res) {
    try {
      let customerId = parseInt(req.params.id);
      let productId = parseInt(req.params.productId);
      await customerModel.deleteFromBasket(customerId, productId);
      res.send();
    } catch (error) {
      res.status(400).send(error.message);
    }
  }