const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const serverConfig = require('./serverConfig');
const controller = require('./controller/controller')
 
app.use(express.json());
app.use(cors());

mongoose.connect(serverConfig.mongooseUrl,{useNewUrlParser: true})

 app.use('/',controller);

app.listen(serverConfig.port,()=>{
    console.log(`server is started on port ${serverConfig.port}`)
})