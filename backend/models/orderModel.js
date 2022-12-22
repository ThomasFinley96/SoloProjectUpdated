const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    // the fields of Order table

    // foreign key associated with User table
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    username: {
        type: String,
        default: ""
    },
    method: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    cheese: {
        type: Number,
        required: true
    },
    sauce: {
        type: Number,
        required: true
    },
    favourites: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("Order", orderSchema)