require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./database/connection');
const measurementRoutes = require('./routes/measurements');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/measurements', measurementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));