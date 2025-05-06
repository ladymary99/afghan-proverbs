const Proverb = require("../models/Proverb");

// GET /proverbs
exports.getAllProverbs = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const proverbs = await Proverb.find(filter);
    res.json(proverbs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /proverbs/:id
exports.getProverbById = async (req, res) => {
  try {
    const proverb = await Proverb.findById(req.params.id);
    if (!proverb) return res.status(404).json({ error: "Not found" });
    res.json(proverb);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /proverbs
exports.createProverb = async (req, res) => {
  try {
    const newProverb = new Proverb(req.body);
    await newProverb.save();
    res.status(201).json(newProverb);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /proverbs/:id
exports.updateProverb = async (req, res) => {
  try {
    const updated = await Proverb.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /proverbs/:id
exports.deleteProverb = async (req, res) => {
  try {
    const deleted = await Proverb.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /proverbs/random
exports.getRandomProverb = async (req, res) => {
  try {
    const count = await Proverb.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomProverb = await Proverb.findOne().skip(randomIndex);
    res.json(randomProverb);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /proverbs/search?keyword=...
exports.searchProverbs = async (req, res) => {
  try {
    const { keyword } = req.query;
    const regex = new RegExp(keyword, "i");
    const results = await Proverb.find({
      $or: [
        { textDari: regex },
        { textPashto: regex },
        { translationEn: regex },
        { meaning: regex },
      ],
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
