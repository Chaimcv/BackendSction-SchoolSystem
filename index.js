const express=require("express");
const app=express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port=3000;
require('dotenv').config();
const url=process.env.MONGO_URL;
console.log(url,"url");
const DbConnection=require("./config/ConnectDB");
const TeacherRouter = require("./Routes/TeacherRoute");


// Middleware
app.use(express.json());
app.use(bodyParser.json());
DbConnection();

app.use("/teacher",TeacherRouter);

//dAsnOnxqI61p9HFo
app.listen(port,()=>{
    console.log(`Server running at port${port}`);
})
