const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: Number, ref: 'User'
        },
        dishes: [{
            dish:{ type: Number, ref: 'Dish' },
            quantity: { type: Number }
        }],
        created: {
            type: Date,
            default: Date.now
        }
    },
    { collection: 'orders' });

orderSchema.plugin(autoIncrement.plugin, 'id');
module.exports = mongoose.model('Order', orderSchema);