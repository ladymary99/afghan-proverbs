const express = require("express");
const app = express();
const proverbsRoutes = require("./routes/proverbsRoutes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/proverbs", proverbsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
