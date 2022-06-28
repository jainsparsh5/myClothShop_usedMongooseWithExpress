const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    print: {
        type: String, 
        required: true
    },
    price: {
        type: Number ,
        required: true , 
        min: 0
    },
    size: {
        type: String,
        lowercase: true,
        enum: ['s','m','l']
    }
})

const Item = mongoose.model('Item' , itemSchema);
module.exports = Item ;