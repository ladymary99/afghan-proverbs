const { v4: uuidv4 } = require("uuid");
const { readData, writeData } = require("../models/proverbModel");

exports.getAllProverbs = (req, res) => {
  const data = readData();
  const { category, search } = req.query;

  let result = data;

  if (category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    result = result.filter((p) =>
      Object.values(p).some((val) =>
        val.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  res.json(result);
};

exports.getProverbById = (req, res) => {
  const data = readData();
  const proverb = data.find((p) => p.id === req.params.id);
  if (proverb) res.json(proverb);
  else res.status(404).json({ message: "Proverb not found" });
};

exports.createProverb = (req, res) => {
  const data = readData();
  const newProverb = { id: uuidv4(), ...req.body };
  data.push(newProverb);
  writeData(data);
  res.status(201).json(newProverb);
};

exports.updateProverb = (req, res) => {
  const data = readData();
  const index = data.findIndex((p) => p.id === req.params.id);
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ message: "Proverb not found" });
  }
};

exports.deleteProverb = (req, res) => {
  let data = readData();
  const initialLength = data.length;
  data = data.filter((p) => p.id !== req.params.id);
  if (data.length < initialLength) {
    writeData(data);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Proverb not found" });
  }
};

exports.getRandomProverb = (req, res) => {
  const data = readData();
  const random = data[Math.floor(Math.random() * data.length)];
  res.json(random);
};
