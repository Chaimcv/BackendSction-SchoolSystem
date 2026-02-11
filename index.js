const express=require("express");
const app=express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port=3000;
require('dotenv').config();
const url=process.env.MONGO_URL;
console.log(url,"url");

app.get('/',(req,res)=>{
    res.send("Response obtained");
});
app.get('/adminDetails',(req,res)=>{
   res.send({
    "name":"Chaithanya",
    "place":"Clt"
   });
});
app.get('/admin',(req,res)=>{
   res.send({
    "name":"Admin",
    "place":"Clt"
   });
});


// Middleware
app.use(bodyParser.json());

// MongoDB connectionster0
mongoose.connect(`mongodb+srv://harikumarv9000:5Zd5Gf4UgKvqbj8w@cluster0.xnvxknj.mongodb.net/BZ-USER-DB?retryWrites=true&w=majority`)
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.log("ERROR ❌", err));
//
//dAsnOnxqI61p9HFo
app.listen(port,()=>{
    console.log(`Server running at port${port}`);
})
//FirstMongoProject