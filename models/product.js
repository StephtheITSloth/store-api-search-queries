const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided']
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided']

    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    company: {
        type: String,
        enum: {
            values: ['ikea','liddy','marcos','caressa'],
            message: '{VALUE} not supported'
        }
    }
})


module.exports = mongoose.model('Product', ProductSchema)