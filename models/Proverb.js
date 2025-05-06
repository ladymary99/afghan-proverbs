const mongoose = require("mongoose");

const proverbSchema = new mongoose.Schema({
  textDari: { type: String, required: true },
  textPashto: { type: String, required: true },
  translationEn: { type: String, required: true },
  meaning: { type: String },
  category: [{ type: String }], // Multiple categories supported
});

module.exports = mongoose.model("Proverb", proverbSchema);
