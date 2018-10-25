const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const dishSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        createdAt: { type: Date, default: new Date() }
    }
);

dishSchema.plugin(autoIncrement.plugin, 'id');

module.exports =  mongoose.model('Dish', dishSchema);