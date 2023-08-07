const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const serverConfig = require('./serverConfig');
const userModel = require('./model/userSchema');

app.use(express.json());
app.use(cors());

mongoose.connect(serverConfig.mongooseUrl,{useNewUrlParser: true})

app.post('/usersignup',async(req,res)=>{
    const {userEmail,userFirstName, userLastName,userCountry,userCity, userPassword}=req.body
    try {
        const oldUserEmail = await userModel.findOne({userEmail:userEmail})
        if(oldUserEmail){
            return res.send('This Email is already taken')
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(userPassword,salt);
        const userDetails = new userModel({
            userEmail:userEmail,
            userFirstName:userFirstName,
            userLastName:userLastName,
            userCountry:userCountry,
            userCity:userCity,
            userPassword:hashedPassword
        });
        await userDetails.save();
        res.send('userdata successfully inserted')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

app.get('/userdatalist',async(req,res)=>{
    try {
        const userDataList = await userModel.find()
        res.send(userDataList)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

app.post('/usersignin',async(req,res)=>{
    const {userEmail,userPassword}=req.body
    try {
        const user = await userModel.findOne({userEmail:userEmail})
        if(!user){
            return res.status(400).send('invalid Email or Password');
        }
        const isMatch = await bcrypt.compare(userPassword,user.userPassword);
        const token = jwt.sign({userId:user._id},serverConfig.jwt_sercretKey);
        if(!isMatch){
           return res.status(400).send('invalid Email or Password')
        }
        if(res.status(200)){
            return res.json({status:'logged in successfully',data:token})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

app.listen(serverConfig.port,()=>{
    console.log(`server is started on port ${serverConfig.port}`)
})