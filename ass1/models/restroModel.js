const mongoose = require("mongoose");

const restroSchema = mongoose.Schema({
    Restroname: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: [{
        name: String,
        description: String,
        price: Number,
        image: String
    }]
})

const Restro = mongoose.model("Restro", restroSchema);

module.exports = {
    Restro
}