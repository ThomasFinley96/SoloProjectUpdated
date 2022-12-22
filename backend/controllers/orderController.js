const Order = require("../models/orderModel")

// get order
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
        res.status(200).json(order)
    }
    catch (error) {
        console.log(error)
    }
}

// create order
exports.createOrder = async (req, res) => {
    try {
        const { method, size, cheese, sauce, favourites, price } = req.body

        const newOrder = await Order.create({
            method,
            size,
            cheese,
            sauce,
            favourites,
            price,
            user: req.user.id,
            username: req.user.firstname
        })
        res.status(201).json(newOrder)
    }
    catch (error) {
        console.log(error)
    }
}

// update order
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.body.id, {
            $set: req.body
        }, {
            new: true
        })
        res.status(200).json(updatedOrder)
    }
    catch (error) {
        console.log(error)
    }
}

// delete order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)

        if (!order) {
            res.status(404).json("Order not found")
        }

        if (!req.user) {
            res.status(401).json("User not found")
        }

        // make sure the logged in user matches the order user
        if (order.user.toString() != req.user.id) {
            res.status(401).json("User not authorized")
        }

        await Order.findByIdAndRemove(order.id)
        res.status(200).json(req.params.orderId)
    }
    catch (error) {
        console.log(error)
    }
}

// get user orders
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId
        const userOrder = await Order.find({ user: userId })
        res.status(200).json(userOrder)
    }
    catch (error) {
        console.log(error)
    }
}