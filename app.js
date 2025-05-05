const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const proverbRoutes = require('./routes/proverbs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// اتصال به MongoDB
mongoose.connect('mongodb://localhost:27017/afghan_proverbs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/proverbs', proverbRoutes);

// شروع سرور
app.listen(PORT, () => {
  console.log( Server running on http://localhost:${PORT});
});