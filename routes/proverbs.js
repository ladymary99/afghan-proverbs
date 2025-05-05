const express = require("express");
const router = express.Router();
const {
  getAllProverbs,
  getProverbById,
  createProverb,
  updateProverb,
  deleteProverb,
  getRandomProverb,
  searchProverbs,
} = require("../controllers/proverbs");

// GET /proverbs
router.get("/", getAllProverbs);

// GET /proverbs/random
router.get("/random", getRandomProverb);

// GET /proverbs/search/:keyword
router.get("/search/:keyword", searchProverbs);

// GET /proverbs/:id
router.get("/:id", getProverbById);

// POST /proverbs
router.post("/", createProverb);

// PUT /proverbs/:id
router.put("/:id", updateProverb);

// DELETE /proverbs/:id
router.delete("/:id", deleteProverb);

module.exports = router;
