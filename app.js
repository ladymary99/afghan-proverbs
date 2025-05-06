const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const proverbsRoutes = require("./routes/proverbs");
app.use("/proverbs", proverbsRoutes);

// Connect MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(
        `✅ Server is running on http://localhost:${process.env.PORT}`
      )
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
