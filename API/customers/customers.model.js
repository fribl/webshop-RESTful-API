import * as fs from "fs/promises";
const CUSTOMERS_FILE = "./customers/customers.json";
const PRODUCTS_FILE = "./products.json";

// return all customer from file
export async function getAllCustomers() {
  try {
    let customersTxt = await fs.readFile(CUSTOMERS_FILE);
    let customers = JSON.parse(customersTxt);
    return customers;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save array of customers to file
async function save(customers = []) {
  let customersTxt = JSON.stringify(customers);
  await fs.writeFile(CUSTOMERS_FILE, customersTxt);
}

// test function for customer ID
function findCustomer(customerArray, Id) {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.customerId === Id
  );
}

// get gustomer by ID
export async function getById(customerId) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId);
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else return customerArray[index];
}

// create a new customer
export async function add(newCustomer) {
  let customerArray = await getAllCustomers();
  if (findCustomer(customerArray, newCustomer.customerId) !== -1 )
    throw new Error(
      `Customer with Id:${newCustomer.customerId} already exists`
    );
  customerArray.push(newCustomer);
  await save(customerArray);
}

// update existing customer - not neccesary for project 2
export async function update(customerId, customer) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray[index] = customer;
    await save(customerArray);
  }
}

// delete existing customer - not neccesary for project 2
export async function remove(customerId) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray.splice(index, 1); // remove customer from array
    await save(customerArray);
  }
}

//---------------Logic for basket----------------
// Lots of code duplication from products.model.js. Could be done 
// in a better way?

export async function getAllProducts() {
  try {
    let productsTxt = await fs.readFile(PRODUCTS_FILE);
    let products = JSON.parse(productsTxt);
    return products;
  } catch (err) {
    if (err.code === "ENOENT") {
      await saveProducts([]); 
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

async function saveProducts(customers = []) {
  let customersTxt = JSON.stringify(customers);
  await fs.writeFile(PRODUCTS_FILE, customersTxt);
}

export async function getProductById(productId) {
  let prodArray = await getAllProducts();
  let index = findProduct(prodArray, productId);
  if (index === -1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else return prodArray[index];
}

function findProduct(productArray, Id) {
  return productArray.findIndex(
    (currProd) => currProd.productId === Id
  );
}

// Puts the productid from the path in the basket array. Dublicates are allowed for now
export async function putInBasket(customerId, productId) {
  let customerArray = await getAllCustomers();
  let productArray = await getAllProducts();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(
      `Customer with Id:${customerId} does not exist`);
    let productIndex = findProduct(productArray, productId);
  if (productIndex === -1)
      throw new Error(`Product with ${productId} does not exist`)
  else {
    customerArray[index].basket.push(productId);
    await save(customerArray);
  }
}

// Delete one product from the basket 
export async function deleteFromBasket(customerId, productId) {
  let customerArray = await getAllCustomers();
  let productArray = await getAllProducts();
  let index = findCustomer(customerArray, customerId);
  if (index === -1)
    throw new Error(
      `Customer with Id:${customerId} does not exist`);
    let productIndex = findProduct(productArray, productId);
  if (productIndex === -1)
      throw new Error(`Product with ${productId} does not exist`)
  else {
    if (customerArray[index].basket.includes(productId)) {
      customerArray[index].basket.splice(productId, 1);
    }
    await save(customerArray);
  }
}

// Get the basket for a specific customer
// Could use an error message saying that the basket is empty[]
export async function getCustomerBasket(customerId) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId)
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    let productsInBasket = new Array();
    let basket = customerArray[index].basket;
    for (let i = 0; i < basket.length; i++) {
      let productId = customerArray[index].basket[i];
      let product = await getProductById(productId);
      productsInBasket.push(product);
    }
    return productsInBasket;
  }
   
}
