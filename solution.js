import Heap from "collections/heap.js";

const input = [
  ["ID1", "Minneapolis", "shoes", 2, "Air"],
  ["ID2", "Chicago", "shoes", 1, "Air"],
  ["ID3", "Central Department Store", "shoes", 5, "BonPied"],
  ["ID4", "Quail Hollow", "forks", 3, "Pfitzcraft"],
];

const input2 = [
  ["ID944806", "Willard Vista", "Intelligent Copper Knife", 3, "Hilll-Gorczany"],
  ["ID644525", "Roger Centers", "Intelligent Copper Knife", 1, "Kunze-Bernhard"],
  ["ID348204", "Roger Centers", "Small Granite Shoes", 4, "Rowe and Legros"],
  ["ID710139", "Roger Centers", "Intelligent Copper Knife", 4, "Hilll-Gorczany"],
  ["ID426632", "Willa Hollow", "Intelligent Copper Knife", 4, "Hilll-Gorczany"],
];

const product_to_order = {};
const brands_to_order = {};
const product_name_brand_leaderboard = {};
const aggregate_product_names_of_order = (product_to_order, row) => {
  const product_name = row[2];
  if (product_to_order[product_name]) {
    product_to_order[product_name] += row[3];
  } else {
    product_to_order[product_name] = row[3];
  }
};

const init_brands_to_order = (brands_to_order, arr) => {
  arr.forEach((row) => {
    const product_name = row[2];
    brands_to_order[product_name] = {};
  });
};

const aggregate_brand_of_product_name = (brands_to_order, row) => {
  const brand_name = row[4];
  if (brands_to_order[brand_name]) {
    brands_to_order[brand_name]++;
  } else {
    brands_to_order[brand_name] = 1;
  }
};

const calculate_product_name_to_order_ratio = (products_aggregate, numberOfOrders) => {
  for (const key in products_aggregate) {
    products_aggregate[key] = products_aggregate[key] / numberOfOrders;
  }
};

const calculate_product_to_order_ratio = (arr) => {
  const numberOfOrders = arr.length;
  arr.forEach((row) => {
    aggregate_product_names_of_order(product_to_order, row);
    aggregate_brand_of_product_name(brands_to_order[row[2]], row);
  });
  calculate_product_name_to_order_ratio(product_to_order, numberOfOrders);
};

const generate_brands_product_name_board = (brands_to_order) => {
  for (const key in brands_to_order) {
    const heap = new Heap(Object.entries(brands_to_order[key]), null, (a, b) => a[1] - b[1]);
    product_name_brand_leaderboard[key] = heap.pop()[0];
  }
};

init_brands_to_order(brands_to_order, input2);
calculate_product_to_order_ratio(input2);
generate_brands_product_name_board(brands_to_order);
console.log(product_to_order);
console.log(product_name_brand_leaderboard);
