const mongoose = require("mongoose");

const proverbSchema = new mongoose.Schema({
  textDari: { type: String, required: true },
  textPashto: { type: String, required: true },
  translationEn: { type: String, required: true },
  meaning: { type: String },
  category: { type: String },
});

// ایجاد مدل
const Proverb = mongoose.model("Proverb", proverbSchema);

module.exports = Proverb;
