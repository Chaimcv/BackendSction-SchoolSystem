 const[data,setData]=useState([]);

  useEffect(() => {
  fetch('http://127.0.0.1:8000/teacher') //backend connection api
    .then((res) => res.json())
    .then((data) => setData(data.message)
  );

}, []);
console.log(data,"data accessed from backend");




const express=require("express");
const app=express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port=8000;                                            //backend port set as 8000
require('dotenv').config();
const url=process.env.MONGO_URL;
console.log(url,"url");
const DbConnection=require("./config/ConnectDB");
const TeacherRouter = require("./Routes/TeacherRoute");

//to establish connection btw frontend and backend
const cors = require('cors');
app.use(cors({ origin: ['http://localhost:3000'] }));       //frontend runs in port 3000



// Middleware
app.use(express.json());
app.use(bodyParser.json());
DbConnection();

app.use("/teacher",TeacherRouter);                          //teacher section route

//dAsnOnxqI61p9HFo
app.listen(port,()=>{
    console.log(`Server running at port${port}`);
})
