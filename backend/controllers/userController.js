const User = require("../models/userModel")
const Order = require("../models/orderModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// register
exports.register = async (req, res) => {
    try {
        const { firstname, lastname, email, address, city, state, password } = req.body

        if (!firstname || !lastname || !email || !address || !city || !password) {
            res.status(400).json("Please add all fields")
        }

        // check if user exist
        const userExist = await User.findOne({ email })

        if (userExist) {
            res.status(400).json("User already exist")
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create user
        const user = await User.create({
            firstname,
            lastname,
            email,
            address,
            city,
            state,
            password: hashedPassword,
        })

        if (user) {
            res.status(201).json({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                address: user.address,
                city: user.city,
                state: user.state,
                token: generateToken(user.id)
            })
        }
        else {
            res.status(400).json("Invalid user data")
        }
    } catch (error) {
        console.log(error)
    }
}

// login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json("Please add all fields")
        }

        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                address: user.address,
                city: user.city,
                state: user.state,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                token: generateToken(user.id)
            })
        }
        else {
            res.status(401).json("Please check your email and pasword")
        }
    } catch (error) {
        console.log(error)
    }
}

// update profile
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            $set: req.body
        }, {
            new: true
        })

        if (!req.body.id) {
            const updatedOrder = await Order.find({ user: req.user.id })
            await Promise.all(updatedOrder.map((id) => {
                return Order.findByIdAndUpdate(id, {
                    $set: req.body
                }, {
                    new: true
                })
            }))
        }
        res.status(200).json({
            id: updatedUser.id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            address: updatedUser.address,
            city: updatedUser.city,            
            state: updatedUser.state,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
            token: generateToken(updatedUser.id)
        })
    }
    catch (error) {
        console.log(error)
    }
}


// delete user
exports.deleteUser = async (req, res) => {
    try {
        await Order.deleteMany({ user: req.user.id })
        await User.findByIdAndDelete(req.user.id)
        res.status(200).json("User has been deleted")
    }
    catch (error) {
        console.log(error)
    }
}

// to visit other users profile
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password")
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}


// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}