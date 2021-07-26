const mongoose = require('mongoose')

const PinSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    title: {
        type: String,
        require: true,
        min: 3
    },
    desc: {
        type: String,
        require: true,
        min: 6,
    },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 5
    }
    
},
    {timestamps: true}
);

module.exports = mongoose.model('Pin', PinSchema)