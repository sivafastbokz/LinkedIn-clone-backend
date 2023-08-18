const jwt = require('jsonwebtoken')
const serverConfig = require('../src/serverConfig')

const authenticate = (req,res,next)=>{
 try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:'unauthroized'})
    }

    const decode = jwt.verify(token,serverConfig.jwt_sercretKey)
    req.userId =decode.userId;
    next();
 } catch (error) {
    console.log(error)
    return res.status(401).json({error:'unauthroized'})
 }
}

module.exports = authenticate;