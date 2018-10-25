const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');

const usersSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        password: {
            type: String,
            required: true
        },
        isAdmin:{
            type: Boolean,
            default: false
        },
        email: {
            type: String,
            index: true,
            unique: true,
            required: true
        },
    }
);

usersSchema.plugin(uniqueValidator);
usersSchema.plugin(autoIncrement.plugin, 'id');

module.exports =  mongoose.model('User', usersSchema);
