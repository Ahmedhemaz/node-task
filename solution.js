import Heap from "collections/heap.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import csv from "fast-csv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = [];
const product_to_order = {};
const brands_to_order = {};
const product_name_brand_leaderboard = {};
const path_name = process.argv[2];

const aggregate_product_names_of_order = (product_to_order, row) => {
  const product_name = row[2];
  if (product_to_order[product_name]) {
    product_to_order[product_name] += +row[3];
  } else {
    product_to_order[product_name] = +row[3];
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

const generate_csv_file = (path_name, data) => {
  const csvFile1 = fs.createWriteStream(path_name);
  const csvStream = csv.format({ headers: true });
  csvStream.pipe(csvFile1).on("end", () => process.exit());
  data.forEach((element) => {
    csvStream.write(element);
  });
  csvStream.end();
};

fs.createReadStream(path.resolve(__dirname, path_name))
  .pipe(csv.parse({ headers: false }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    input.push(row);
  })
  .on("end", () => {
    init_brands_to_order(brands_to_order, input);
    calculate_product_to_order_ratio(input);
    generate_brands_product_name_board(brands_to_order);
    generate_csv_file(`0_${path_name}`, Object.entries(product_to_order));
    generate_csv_file(`1_${path_name}`, Object.entries(product_name_brand_leaderboard));
  });
