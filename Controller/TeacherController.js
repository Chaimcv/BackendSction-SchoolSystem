//Teacher manipulation
const TeacherModel=require("../Models/TeacherModel");

const createTeacher=async(req,res)=>{
    console.log("api called");
    const {name,address,phonenumber,subject,standard}=req.body;   //data from frontend-- api
      
    if(!name){
        return res.send({
                message:"Please enter your name"
            })
       }
    try{
        const newTeacher=new TeacherModel({  //storing data to db
           name:name,
           city:address,
           pincode:address,
           phoneNumber:phonenumber, 
           subject:subject,
          standard:standard
        });
        await newTeacher.save();
        const resData={
            name:newTeacher.name
        }
        console.log(resData,"data");
        res.send({
            message:"Teacher created successfully",
            data:resData

        })

    }catch(er){
        console.log("error",er);
    }
}
module.exports={createTeacher}