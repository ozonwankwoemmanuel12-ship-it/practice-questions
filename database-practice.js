// EXTRA EXERCISES: LOOPS, CASING AND CLOSURES
// Run this file with: node database-practice.js

// The products table
const products = [
  { id: 1, product_name: 'Rice (50kg)', price: 78000, stock_quantity: 12 },
  { id: 2, product_name: 'Notebook', price: 1500, stock_quantity: 0 },
  { id: 3, product_name: 'School Bag', price: 12000, stock_quantity: 4 },
  { id: 4, product_name: 'Biro (pack)', price: 800, stock_quantity: 60 },
  { id: 5, product_name: 'Garri (bag)', price: 25000, stock_quantity: 2 },
  { id: 6, product_name: 'Lunch Box', price: 4500, stock_quantity: 0 }
];

// The orders table
const orders = [
  { order_id: 101, customer_name: 'Ada', total: 15000, status: 'paid' },
  { order_id: 102, customer_name: 'Obi', total: 4500, status: 'pending' },
  { order_id: 103, customer_name: 'Ngozi', total: 78000, status: 'paid' },
  { order_id: 104, customer_name: 'Ada', total: 800, status: 'paid' },
  { order_id: 105, customer_name: 'Kunle', total: 25000, status: 'cancelled' },
  { order_id: 106, customer_name: 'Obi', total: 12000, status: 'pending' }
];

// PART 1: READING THE TABLE

// Exercise 1: Print each product name and price.
console.log('\nExercise 1');
for (const product of products) {
  console.log(product.product_name + ' - ' + product.price);
}

// Exercise 2: Count products that have no stock.
let outOfStockCount = 0;
for (const product of products) {
  if (product.stock_quantity === 0) {
    outOfStockCount++;
  }
}
console.log('\nExercise 2:', outOfStockCount); // Expected: 2

// Exercise 3: Add the value of all products currently in stock.
let shelfValue = 0;
for (const product of products) {
  shelfValue = shelfValue + product.price * product.stock_quantity;
}
console.log('\nExercise 3:', shelfValue); // Expected: 1082000

// Exercise 4: Collect the names of products that cost less than 5000.
const productsUnder5000 = [];
for (const product of products) {
  if (product.price < 5000) {
    productsUnder5000.push(product.product_name);
  }
}
console.log('\nExercise 4:', productsUnder5000);
// Expected: ['Notebook', 'Biro (pack)', 'Lunch Box']

// Exercise 5: Find a product by its ID.
function findProductById(productTable, id) {
  for (const product of productTable) {
    if (product.id === id) {
      return product;
    }
  }
  return 'Product not found';
}
console.log('\nExercise 5:', findProductById(products, 3));
console.log(findProductById(products, 99)); // Expected: 'Product not found'

// PART 2: REPORTS FOR THE SHOP OWNER

// Exercise 6: Add up only the paid orders.
let totalMoneyReceived = 0;
for (const order of orders) {
  if (order.status === 'paid') {
    totalMoneyReceived = totalMoneyReceived + order.total;
  }
}
console.log('\nExercise 6:', totalMoneyReceived); // Expected: 93800

// Exercise 7: Count how many orders have each status.
function countByStatus(orderTable) {
  const statusCounts = {};

  for (const order of orderTable) {
    const status = order.status;

    if (statusCounts[status] === undefined) {
      statusCounts[status] = 0;
    }
    statusCounts[status]++;
  }

  return statusCounts;
}
console.log('\nExercise 7:', countByStatus(orders));
// Expected: { paid: 3, pending: 2, cancelled: 1 }

// Exercise 8: Show the three most expensive products.
// Copy the array first so sorting will not change the original products array.
const productsCopy = products.slice();
productsCopy.sort(function (first, second) {
  return second.price - first.price;
});

const threeMostExpensive = [];
for (let i = 0; i < 3; i++) {
  threeMostExpensive.push(productsCopy[i].product_name);
}
console.log('\nExercise 8:', threeMostExpensive);
// Expected: ['Rice (50kg)', 'Garri (bag)', 'School Bag']

// Exercise 9: Make a message for products with less than five items in stock.
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
console.log('\nExercise 9:', stockAlerts);

// Exercise 10: List each customer with a paid order only once.
const paidCustomers = [];
for (const order of orders) {
  if (order.status === 'paid' && !paidCustomers.includes(order.customer_name)) {
    paidCustomers.push(order.customer_name);
  }
}
console.log('\nExercise 10:', paidCustomers); // Expected: ['Ada', 'Ngozi']

// PART 3: CASING AND DATABASES

// Exercise 11: Change snake_case text to camelCase.
function toCamelCase(text) {
  const parts = text.split('_');
  let result = parts[0];

  for (let i = 1; i < parts.length; i++) {
    if (parts[i].length > 0) {
      result = result + parts[i][0].toUpperCase() + parts[i].slice(1);
    }
  }

  return result;
}
console.log('\nExercise 11:', toCamelCase('stock_quantity')); // stockQuantity
console.log(toCamelCase('product_name')); // productName
console.log(toCamelCase('price')); // price

// Exercise 12: Make a new object with camelCase keys.
function convertRow(row) {
  const newRow = {};
  const keys = Object.keys(row);

  for (const key of keys) {
    newRow[toCamelCase(key)] = row[key];
  }

  return newRow;
}
console.log('\nExercise 12:', convertRow({ product_name: 'Notebook', stock_quantity: 0 }));

const convertedProducts = [];
for (const product of products) {
  convertedProducts.push(convertRow(product));
}
console.log('Converted products:', convertedProducts);

// Exercise 13: Correct naming styles.
// (a) React component: ProductCard (PascalCase).
// (b) CSS class: product-card (kebab-case).
// (c) Constant delivery fee: DELIVERY_FEE (SCREAMING_SNAKE_CASE).
// (d) Variable for one order's total: orderTotal (camelCase).
// (e) Database column for order creation time: created_at (snake_case).

// PART 4: CLOSURES IN A SHOP

// Exercise 14: Remember the next number and return a new order number each time.
function createOrderNumber(start) {
  let nextNumber = start;

  return function () {
    const orderNumber = 'ORD-' + nextNumber;
    nextNumber++;
    return orderNumber;
  };
}
const nextOrder = createOrderNumber(1001);
console.log('\nExercise 14:', nextOrder()); // Expected: ORD-1001
console.log(nextOrder()); // Expected: ORD-1002
console.log(nextOrder()); // Expected: ORD-1003

// Exercise 15: Save each lookup result so the same ID does not need another search.
function makeLookup(productTable) {
  const savedProducts = {};

  return function (id) {
    if (Object.prototype.hasOwnProperty.call(savedProducts, id)) {
      console.log('from memory');
      return savedProducts[id];
    }

    console.log('searching table');
    const product = findProductById(productTable, id);
    savedProducts[id] = product;
    return product;
  };
}
const lookup = makeLookup(products);
console.log('\nExercise 15:');
console.log(lookup(3)); // Prints 'searching table', then returns School Bag.
console.log(lookup(3)); // Prints 'from memory', then returns School Bag.
console.log(lookup(5)); // Prints 'searching table', then returns Garri.

// Exercise 16: Keep the stock variable inside the function so it cannot be changed directly.
function createStockManager(startQty) {
  let stock = startQty;

  return {
    add: function (n) {
      stock = stock + n;
      return stock;
    },
    remove: function (n) {
      if (n > stock) {
        return 'Not enough stock';
      }
      stock = stock - n;
      return stock;
    },
    getStock: function () {
      return stock;
    }
  };
}
const bags = createStockManager(4);
console.log('\nExercise 16:', bags.add(10)); // Expected: 14
console.log(bags.remove(20)); // Expected: 'Not enough stock'
console.log(bags.getStock()); // Expected: 14
console.log(bags.stock); // Expected: undefined

// PART 5: PUT IT ALL TOGETHER

// Exercise 17: Return the paid total, number of pending orders, and biggest order.
function dailyReport(orderTable) {
  let totalPaid = 0;
  let pendingCount = 0;
  let biggestOrder = 0;

  for (const order of orderTable) {
    if (order.status === 'paid') {
      totalPaid = totalPaid + order.total;
    }

    if (order.status === 'pending') {
      pendingCount++;
    }

    if (order.total > biggestOrder) {
      biggestOrder = order.total;
    }
  }

  return {
    totalPaid: totalPaid,
    pendingCount: pendingCount,
    biggestOrder: biggestOrder
  };
}
console.log('\nExercise 17:', dailyReport(orders));
// Expected: { totalPaid: 93800, pendingCount: 2, biggestOrder: 78000 }

// Exercise 18: Example explanation for Exercise 3. Rewrite this in your own words
// after you have practised explaining the code.
// I start shelfValue at zero because I need a place to keep the total.
// The loop goes through the products one at a time. For each product, I multiply
// the price by the number in stock, then add that amount to shelfValue. When the
// loop finishes, shelfValue is the value of all the products that are in stock.
