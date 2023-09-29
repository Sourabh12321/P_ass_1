const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/userModel")
require("dotenv").config()
const UserRouter = express.Router();


UserRouter.post("/register",async(req,res)=>{
    try {
        let {name,email,password,address:{street,city,state,country,zip}} = req.body;
        let data = await User.findOne({"email":email});
        if(data){
            res.status(200).json({"msg":"User is already registered"});
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(hash){
                    let user = new User({name,email,password:hash,address:{street,city,state,country,zip}});
                    await user.save();
                    res.status(200).json({"msg":"User is registered successfully"});
                }
            })
        }


    } catch (error) {
        res.status(400).json({"msg":"Something went wrong"});
    }
})

UserRouter.post("/login",async(req,res)=>{
    try {
        let {email,password} = req.body;
        let data = await User.findOne({"email":email});
        if(!data){
            res.status(200).json({"msg":"User is not registered"});
        }else{
            bcrypt.compare(password,data.password,async(err,decoded)=>{
                if(decoded){
                    let token = jwt.sign({"userID":data._id,"email":data.email},process.env.KEY,{expiresIn:"2hr"});
                    res.status(200).json({"msg":"login successfully",token});
                }else{
                    res.status(200).json({"msg":"wrong password"});
                }
            })
        }


    } catch (error) {
        res.status(400).json({"msg":"Something went wrong"});
    }
})

UserRouter.patch("/user/:id/reset",async(req,res)=>{
    try {
        let {email,password} = req.body;
        let data = await User.findOne({"email":email});
        if(!data){
            res.status(200).json({"msg":"User is not registered"});
        }else{
            bcrypt.compare(password,data.password,async(err,decoded)=>{
                if(decoded){
                    let token = jwt.sign({"userID":data._id,"email":data.email},"ass1",{expiresIn:"2hr"});
                    res.status(200).json({"msg":"login successfully",token});
                }else{
                    res.status(200).json({"msg":"wrong password"});
                }
            })
        }
    } catch (error) {
        res.status(400).json({"msg":"Something went wrong"});
    }
})


module.exports = {
    UserRouter
}