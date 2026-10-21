// EXTRA EXERCISES: LOOPS, CASING AND CLOSURES WITH DATABASE-STYLE DATA
// Run this file with: node database-practice.js

const products = [
  { id: 1, product_name: 'Rice (50kg)', price: 78000, stock_quantity: 12 },
  { id: 2, product_name: 'Notebook', price: 1500, stock_quantity: 0 },
  { id: 3, product_name: 'School Bag', price: 12000, stock_quantity: 4 },
  { id: 4, product_name: 'Biro (pack)', price: 800, stock_quantity: 60 },
  { id: 5, product_name: 'Garri (bag)', price: 25000, stock_quantity: 2 },
  { id: 6, product_name: 'Lunch Box', price: 4500, stock_quantity: 0 },
];

const orders = [
  { order_id: 101, customer_name: 'Ada', total: 15000, status: 'paid' },
  { order_id: 102, customer_name: 'Obi', total: 4500, status: 'pending' },
  { order_id: 103, customer_name: 'Ngozi', total: 78000, status: 'paid' },
  { order_id: 104, customer_name: 'Ada', total: 800, status: 'paid' },
  { order_id: 105, customer_name: 'Kunle', total: 25000, status: 'cancelled' },
  { order_id: 106, customer_name: 'Obi', total: 12000, status: 'pending' },
];

// PART 1: READING THE TABLE (LOOPS)

// Exercise 1: Print every product name and price on its own line.
console.log('\nExercise 1: Product names and prices');
for (const product of products) {
  console.log(product.product_name + ' - ' + product.price);
}

// Exercise 2: Count products that are out of stock.
let outOfStockCount = 0;
for (const product of products) {
  if (product.stock_quantity === 0) outOfStockCount++;
}
console.log('\nExercise 2: Number of products out of stock');
console.log(outOfStockCount); // Expected: 2

// Exercise 3: Add the value of each product's stock to get the total shelf value.
let shelfValue = 0;
for (const product of products) {
  shelfValue += product.price * product.stock_quantity;
}
console.log('\nExercise 3: Total value of stock on the shelves');
console.log(shelfValue); // Expected: 1082000

// Exercise 4: Collect names of products costing less than 5000.
const productsUnder5000 = [];
for (const product of products) {
  if (product.price < 5000) productsUnder5000.push(product.product_name);
}
console.log('\nExercise 4: Products under 5000');
console.log(productsUnder5000); // Expected: ['Notebook', 'Biro (pack)', 'Lunch Box']

// Exercise 5: Return a product by ID, or a not-found message.
function findProductById(productTable, id) {
  for (const product of productTable) {
    if (product.id === id) return product;
  }
  return 'Product not found';
}
console.log('\nExercise 5: Find product by ID');
console.log(findProductById(products, 3));
console.log(findProductById(products, 99)); // Expected: 'Product not found'

// PART 2: REPORTS THE OWNER NEEDS

// Exercise 6: Sum only orders whose status is paid.
let totalMoneyReceived = 0;
for (const order of orders) {
  if (order.status === 'paid') totalMoneyReceived += order.total;
}
console.log('\nExercise 6: Total money received from paid orders');
console.log(totalMoneyReceived); // Expected: 93800

// Exercise 7: Return an object counting each order status.
function countByStatus(orderTable) {
  const statusCounts = {};
  for (const order of orderTable) {
    if (statusCounts[order.status] === undefined) statusCounts[order.status] = 0;
    statusCounts[order.status]++;
  }
  return statusCounts;
}
console.log('\nExercise 7: Count orders by status');
console.log(countByStatus(orders)); // Expected: { paid: 3, pending: 2, cancelled: 1 }

// Exercise 8: Sort a copy so the original products array is not changed.
const threeMostExpensive = [...products]
  .sort((first, second) => second.price - first.price)
  .slice(0, 3)
  .map((product) => product.product_name);
console.log('\nExercise 8: Three most expensive products');
console.log(threeMostExpensive); // Expected: ['Rice (50kg)', 'Garri (bag)', 'School Bag']

// Exercise 9: Create alerts for products with fewer than 5 items in stock.
const stockAlerts = [];
for (const product of products) {
  if (product.stock_quantity < 5) {
    if (product.stock_quantity === 0) {
      stockAlerts.push('Out of stock: ' + product.product_name);
    } else {
      stockAlerts.push(
        'Low stock: ' + product.product_name + ' (' + product.stock_quantity + ' left)'
      );
    }
  }
}
console.log('\nExercise 9: Stock alerts');
console.log(stockAlerts);

// Exercise 10: Keep each paid customer's name only once.
const paidCustomers = [];
for (const order of orders) {
  if (order.status === 'paid' && !paidCustomers.includes(order.customer_name)) {
    paidCustomers.push(order.customer_name);
  }
}
console.log('\nExercise 10: Customers with at least one paid order');
console.log(paidCustomers); // Expected: ['Ada', 'Ngozi']

// PART 3: CASING AND DATABASES

// Exercise 11: Convert snake_case text to camelCase.
function toCamelCase(text) {
  const parts = text.split('_');
  const firstPart = parts[0];
  const remainingParts = parts.slice(1).map((part) => {
    if (part.length === 0) return '';
    return part[0].toUpperCase() + part.slice(1);
  });
  return firstPart + remainingParts.join('');
}
console.log('\nExercise 11: Convert snake_case to camelCase');
console.log(toCamelCase('stock_quantity')); // Expected: 'stockQuantity'
console.log(toCamelCase('product_name')); // Expected: 'productName'
console.log(toCamelCase('price')); // Expected: 'price'

// Exercise 12: Return a new row with converted keys, then convert every product.
function convertRow(row) {
  const convertedRow = {};
  for (const [key, value] of Object.entries(row)) {
    convertedRow[toCamelCase(key)] = value;
  }
  return convertedRow;
}
const convertedProducts = products.map((product) => convertRow(product));
console.log('\nExercise 12: Convert one row');
console.log(convertRow({ product_name: 'Notebook', stock_quantity: 0 }));
console.log('All products with camelCase keys:');
console.log(convertedProducts);

// Exercise 13: Correct naming conventions.
// (a) React component: ProductCard (PascalCase).
// (b) CSS class: product-card (kebab-case).
// (c) Constant delivery fee: DELIVERY_FEE (SCREAMING_SNAKE_CASE).
// (d) Variable holding one order's total: orderTotal (camelCase).
// (e) Database column for order creation time: created_at (snake_case).

// PART 4: CLOSURES IN A SHOP

// Exercise 14: Return a function that generates consecutive order numbers.
function createOrderNumber(start) {
  let nextNumber = start;
  return function () {
    const orderNumber = 'ORD-' + nextNumber;
    nextNumber++;
    return orderNumber;
  };
}
const nextOrder = createOrderNumber(1001);
console.log('\nExercise 14: Order number generator');
console.log(nextOrder()); // Expected: 'ORD-1001'
console.log(nextOrder()); // Expected: 'ORD-1002'
console.log(nextOrder()); // Expected: 'ORD-1003'

// Exercise 15: Cache lookups in a closure so an ID is searched only once.
function makeLookup(productTable) {
  const cache = new Map();
  return function (id) {
    if (cache.has(id)) {
      console.log('from memory');
      return cache.get(id);
    }
    console.log('searching table');
    const result = findProductById(productTable, id);
    cache.set(id, result);
    return result;
  };
}
const lookup = makeLookup(products);
console.log('\nExercise 15: Cached product lookup');
console.log(lookup(3)); // Logs 'searching table', returns School Bag.
console.log(lookup(3)); // Logs 'from memory', returns School Bag.
console.log(lookup(5)); // Logs 'searching table', returns Garri.

// Exercise 16: Stock stays private because it exists only inside this closure.
function createStockManager(startQty) {
  let stock = startQty;
  return {
    add(n) {
      stock += n;
      return stock;
    },
    remove(n) {
      if (n > stock) return 'Not enough stock';
      stock -= n;
      return stock;
    },
    getStock() {
      return stock;
    },
  };
}
const bags = createStockManager(4);
console.log('\nExercise 16: Private stock manager');
console.log(bags.add(10)); // Stock is now 14.
console.log(bags.remove(20)); // Expected: 'Not enough stock'; stock stays 14.
console.log(bags.getStock()); // Expected: 14
console.log(bags.stock); // Expected: undefined; stock is private.

// PART 5: PUT IT ALL TOGETHER

// Exercise 17: Summarise paid totals, pending order count, and largest order.
function dailyReport(orderTable) {
  let totalPaid = 0;
  let pendingCount = 0;
  let biggestOrder = 0;
  for (const order of orderTable) {
    if (order.status === 'paid') totalPaid += order.total;
    if (order.status === 'pending') pendingCount++;
    if (order.total > biggestOrder) biggestOrder = order.total;
  }
  return { totalPaid, pendingCount, biggestOrder };
}
console.log('\nExercise 17: Daily report');
console.log(dailyReport(orders));
// Expected: { totalPaid: 93800, pendingCount: 2, biggestOrder: 78000 }

// Exercise 18: Explanation in my own words (using Exercise 3).
// First, I set shelfValue to zero so there is a variable for the running total.
// Then the for...of loop visits each product in the products array, one by one.
// For each product, I multiply its price by stock_quantity to get the value of
// that product's stock. I add the result to shelfValue. After all six products
// have been processed, shelfValue is the total value of all stock: 1,082,000.
