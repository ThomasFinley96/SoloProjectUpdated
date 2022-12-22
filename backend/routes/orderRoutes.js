const router = require("express").Router()
const protect = require("../middleware/authMiddleware")

const {
    getOrder,
    getUserOrders,
    createOrder,
    updateOrder,
    deleteOrder } = require("../controllers/orderController")

router.get("/:orderId", getOrder)

router.get("/user/:userId", getUserOrders)

router.post("/", protect, createOrder)

router.put("/updateOrder", protect, updateOrder)

router.delete("/:orderId", protect, deleteOrder)

module.exports = router