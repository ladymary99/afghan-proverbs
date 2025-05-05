const Proverb = require("../models/Proverb");

// دریافت همه ضرب‌المثل‌ها
exports.getAllProverbs = async (req, res) => {
  try {
    const proverbs = await Proverb.find();
    res.json(proverbs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// دریافت یک ضرب‌المثل بر اساس ID
exports.getProverbById = async (req, res) => {
  try {
    const proverb = await Proverb.findById(req.params.id);
    if (!proverb) return res.status(404).json({ error: "Proverb not found" });
    res.json(proverb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ایجاد ضرب‌المثل جدید
exports.createProverb = async (req, res) => {
  try {
    const newProverb = new Proverb(req.body);
    await newProverb.save();
    res.status(201).json(newProverb);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// به‌روزرسانی ضرب‌المثل
exports.updateProverb = async (req, res) => {
  try {
    const updatedProverb = await Proverb.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProverb)
      return res.status(404).json({ error: "Proverb not found" });
    res.json(updatedProverb);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// حذف ضرب‌المثل
exports.deleteProverb = async (req, res) => {
  try {
    const deletedProverb = await Proverb.findByIdAndDelete(req.params.id);
    if (!deletedProverb)
      return res.status(404).json({ error: "Proverb not found" });
    res.json({ message: "Proverb deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// دریافت ضرب‌المثل تصادفی
exports.getRandomProverb = async (req, res) => {
  try {
    const count = await Proverb.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomProverb = await Proverb.findOne().skip(random);
    res.json(randomProverb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// جستجوی ضرب‌المثل‌ها
exports.searchProverbs = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const proverbs = await Proverb.find({
      $or: [
        { textDari: { $regex: keyword, $options: "i" } },
        { textPashto: { $regex: keyword, $options: "i" } },
        { translationEn: { $regex: keyword, $options: "i" } },
        { meaning: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json(proverbs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
