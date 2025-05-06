const fs = require("fs");
const path = "./data/proverbs.json";

function readData() {
  return JSON.parse(fs.readFileSync(path));
}

function writeData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
