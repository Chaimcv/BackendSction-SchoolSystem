const ParentModel=require("../Models/ParentModel");
const mongoose=require("mongoose");
const crypto=require("crypto");
const generator=require("generate-password");


const createParent=async(req,res)=>{
    console.log("parent api called");

    const password = generator.generate({
        length: 10,
        numbers: true
    });
    console.log(password);

    const{name,email,studentname,studentId,phonenumber,address,pincode}=req.body;
}