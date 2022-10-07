import * as fs from "fs/promises";
const PRODUCTS_FILE = "./products.json";

// return all products from a file
export async function getAll() {
  try {
    let productsTxt = await fs.readFile(PRODUCTS_FILE);
    let products = JSON.parse(productsTxt);
    return products;
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
//not sure I need this one? i do, int getAll
async function save(products = []) {
  let productsTxt = JSON.stringify(products);
  await fs.writeFile(PRODUCTS_FILE, productsTxt);
}

// test function for customer ID
function findProducts(productArray, Id) {
  return productArray.findIndex(
    (currProduct) => currProduct.productId === Id
  );
}

// get gustomer by ID
export async function getByID(productId) {
  let prodArray = await getAll();
  let index = findProducts(prodArray, productId);
  if (index === -1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else return prodArray[index];
}

//___________Maybe not needed functions_____________
// create a new customer
//I dont need this??
export async function add(newProduct) {
  let productArray = await getAll();
  if (findProducts(productArray, newProduct.productId) !== -1 )
    throw new Error(
      `Product with Id:${newProduct.productId} already exists`
    );
  productArray.push(newProduct);
  await save(productArray);
}

// update existing customer
export async function update(productId, product) {
  let productArray = await getAll();
  let index = findProducts(productArray, productId); // findIndex
  if (index === -1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else {
    productArray[index] = product;
    await save(productArray);
  }
}

//--------additional functions adopted from lesson 8-----------
//change this to remove from basket
export async function remove(productId) {
  let productArray = await getAll();
  let index = findProducts(productArray, productId); // findIndex
  if (index === -1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else {
    productArray.splice(index, 1); // remove customer from array
    await save(productArray);
  }
}


function removeDublicates(categories) {
   return categories.filter((value, index) => categories.indexOf(value) === index);
}

export async function getAllCategories() {
  let productArray = await getAll();
  let categories = [];
  [productArray].map(productArray => {
      productArray.map(({category}) => {if(category) categories.push(category)})
    });
    if (categories.lenght === 0) {
      throw new Error(`Categories cannot be found`);
    } else {
      return removeDublicates(categories);
    }
    
}

export async function getByCategory(category) {
  let array = await getAll();
  let filtered = array.filter(function (element){
    return element.category === category;
  }
  ); 
  if (filtered.lenght === 0) {
    throw new Error (`No products in the category ${category}`)
  } else {
    return filtered;
  }
  
}

export async function getProductFromCategory(category, id) {
  let array = await getByCategory(category);
  let index = findProducts(array, id);
  if (index === -1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else return array[index];
}

