const express = require("express");
const { Orders } = require("../models/orderModel")
const {auth} = require("../middleware/auth")
const OrdersRouter = express.Router();


OrdersRouter.post("/orders",auth, async (req, res) => {
    try {
        let { user, restaurant, items:
            [{ name, price, quantity }],
            totalPrice, deliveryAddress:
            {
                street,
                city,
                state,
                country,
                zip
            },
            status
        } = req.body;
        let data = new Orders({
            user, restaurant, items:
                [{ name, price, quantity }],
            totalPrice, deliveryAddress:
            {
                street,
                city,
                state,
                country,
                zip
            },
            status
        });
        await data.save();
        res.status(200).json({ "msg": "order placed successfully" });
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
})

OrdersRouter.get("/orders/:id",auth, async (req, res) => {
    try {
        let id = req.params.id;
        let data = await Orders.findOne({ "_id": id })
            .populate("user") 
            .populate("restaurant");

        res.status(200).json({ "msg": data });
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
})

OrdersRouter.patch("/orders/:id",auth, async (req, res) => {
    try {
        let id = req.params.id;
        let { status } = req.body;
        await Orders.findByIdAndUpdate(id, { status: status });
        res.status(200).json({ "msg": "updated successfully" });
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
})





module.exports = {
    OrdersRouter
}