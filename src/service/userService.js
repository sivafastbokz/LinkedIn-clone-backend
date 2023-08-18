const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userSchema');
const postModel = require('../model/postSchema');
const serverConfig = require('../serverConfig');
// const authenticate = require('../auth');

 const userSignUp =async(req,res)=>{
  const {userEmail,userFirstName, userLastName, userPassword}=req.body
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
          userPassword:hashedPassword
      });
      await userDetails.save();
      res.send('userdata successfully inserted')
  } catch (error) {
      console.log(error)
      res.status(500).send('Internal server error');
  }
 }

 const getUserList = async(req,res)=>{
  try {
    const userDataList = await userModel.find()
    res.send(userDataList)
} catch (error) {
    console.log(error)
    res.status(500).send('Internal server error');
}
}

const userSignIn = async(req,res)=>{
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
}

const userPost = async(req,res)=>{
  const{postContent}=req.body
  const userId = req.userId
  try {
      const userPost = new postModel({
          userId:userId,
          postContent:postContent,
      });
      await userPost.save();
      res.send('post successfully created')
  } catch (error) {
      console.log(error)
      res.status(500).send('Internal server error');
  }
}

const getUserPost = async(req,res)=>{
  try {
    const userId = req.userId
    const userPostsData = await postModel.find({userId:userId});
    res.send(userPostsData)
} catch (error) {
    console.log(error)
    res.status(500).send('Internal server error');
}
}

module.exports ={userSignUp,userSignIn,userPost,getUserList,getUserPost}
