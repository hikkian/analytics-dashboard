const express = require('express');
const Measurement = require('../models/Measurement');

const router = express.Router();

// Получение данных
router.get('/', async (req, res) => {
    try {
        const { field, start_date, end_date } = req.query;

        if (!field) {
            return res.status(400).json({ error: "Field parameter is required." });
        }

        const filter = {};

        if (start_date && end_date) {
            const startDate = new Date(start_date);
            const endDate = new Date(end_date);

            // Убедимся, что endDate включает весь день
            if (!endDate.toISOString().includes('23:59:59')) {
                endDate.setHours(23, 59, 59, 999);
            }

            filter.timestamp = { 
                $gte: startDate, 
                $lte: endDate 
            };
        }

        const data = await Measurement.find(filter, { timestamp: 1, [field]: 1, _id: 0 });
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Получение метрик
router.get('/metrics', async (req, res) => {
    try {
        const { field, start_date, end_date } = req.query;

        if (!field || !start_date || !end_date) {
            return res.status(400).json({ error: "All parameters are required." });
        }

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        // Убедимся, что endDate включает весь день
        if (!endDate.toISOString().includes('23:59:59')) {
            endDate.setHours(23, 59, 59, 999);
        }

        const data = await Measurement.find({
            timestamp: { $gte: startDate, $lte: endDate }
        }, { [field]: 1, _id: 0 });

        if (data.length === 0) {
            return res.status(404).json({ error: "No data found." });
        }

        const values = data.map(d => d[field]);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const min = Math.min(...values);
        const max = Math.max(...values);
        const stdDev = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length);

        res.json({ avg, min, max, stdDev });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;