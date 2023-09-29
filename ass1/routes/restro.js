const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types; 
const {auth} = require("../middleware/auth")
const { Restro } = require("../models/restroModel")

const RestroRouter = express.Router();


RestroRouter.post("/restaurants",auth, async (req, res) => {
    try {
        let { Restroname, address: { street, city, state, country, zip }, menu: [{ name, description, price, image }] } = req.body;
        let data = new Restro({ Restroname, address: { street, city, state, country, zip }, menu: [{ name, description, price, image }] });
        await data.save();
        res.status(200).json({ "msg": "restrauant added successfully" });
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }

})

RestroRouter.get("/restaurants",auth, async (req, res) => {
    try {
        let restro = await Restro.find();
        if (restro) {
            res.status(200).json({ "msg": restro });
        } else {
            res.status(200).json({ "msg": "restro is not found" });
        }

    } catch (error) {
        res.status(400).json({ "msg": "Something went wrong" });
    }
})

RestroRouter.get("/restaurants/:id",auth, async (req, res) => {
    try {
        let id = req.params.id
        let restro = await Restro.findOne({ "_id": id });
        if (restro) {
            res.status(200).json({ "msg": restro });
        } else {
            res.status(200).json({ "msg": "restro is not found" });
        }

    } catch (error) {
        res.status(400).json({ "msg": "Something went wrong" });
    }
})

RestroRouter.get("/restaurants/:id/menu",auth, async (req, res) => {
    try {
        let id = req.params.id
        let restro = await Restro.findOne({ "_id": id });
        if (restro) {
            res.status(200).json({ "msg": restro.menu });
        } else {
            res.status(200).json({ "msg": "restro is not found" });
        }

    } catch (error) {
        res.status(400).json({ "msg": "Something went wrong" });
    }
})

RestroRouter.post("/restaurants/:id/menu",auth, async (req, res) => {
    try {
        let id = req.params.id
        let { name, description, price, image } = req.body;
        let obj = { name, description, price, image }
        let restro = await Restro.findOne({ "_id": id });
        if (restro) {
            restro.menu.push(obj);
            await restro.save();
            res.status(200).json({ "msg": "item is added to the cart" });
        } else {
            res.status(200).json({ "msg": "restro is not found" });
        }

    } catch (error) {
        res.status(400).json({ "msg": "Something went wrong" });
    }
})


RestroRouter.delete("/restaurants/:id1/menu/:id2",auth, async (req, res) => {
    try {
        const { id1, id2 } = req.params;
        const restro = await Restro.findOne({ "_id": id1 });
        if (restro) {
            console.log(restro.menu);
            const checkId = new ObjectId(id2); // Use 'new' to create a new ObjectId instance
            const menuItemIndex = restro.menu.findIndex(item => item._id.equals(checkId));
            if (menuItemIndex === -1) {
                return res.status(404).json({ message: 'Menu item not found' });
            }
            restro.menu.splice(menuItemIndex, 1);
            await restro.save();
            return res.status(200).json({ "msg": "Menu item deleted" });
        } else {
            return res.status(404).json({ "msg": "Restaurant not found" });
        }
    } catch (error) {
        return res.status(500).json({ "msg": error.message });
    }
})



module.exports = {
    RestroRouter
}