const mongoose = require('./connection');
const Measurement = require('../models/Measurement');

async function seedDatabase() {
    await Measurement.deleteMany({});

    const data = [];
    const startDate = new Date('2025-01-01T00:00:00Z');

    for (let i = 0; i < 72; i++) {
        data.push({
            timestamp: new Date(startDate.getTime() + i * 3600000),
            field1: +(Math.random() * 5 + 20).toFixed(2),
            field2: +(Math.random() * 10 + 50).toFixed(2),
            field3: +(Math.random() * 50 + 400).toFixed(2)
        });
    }

    await Measurement.insertMany(data);
    console.log('Database seeded!');
    process.exit();
}

seedDatabase();