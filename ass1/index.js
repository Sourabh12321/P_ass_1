const express = require("express");
const {connection} = require("./config/db")
const {OrdersRouter} = require("./routes/order")
const {RestroRouter} = require("./routes/restro")
const {UserRouter} = require("./routes/user")

const app = express();
app.use(express.json());

app.use("/user",UserRouter)
app.use("/restro",RestroRouter)
app.use("/orders",OrdersRouter)


app.get("/",(req,res)=>{
    res.send("home page")
})


app.listen(3000,async()=>{
    try {
        await connection
        console.log("running")
    } catch (error) {
        console.log(error.message)
    }
})