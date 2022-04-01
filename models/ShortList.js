const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "candidate",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
     price: {
        type: Number,
        //  required: true
     },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})
const ShortlistSchema = new Schema({
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('shortlist', ShortlistSchema);