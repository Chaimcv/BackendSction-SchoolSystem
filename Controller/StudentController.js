const StudentModel=require("../Models/StudentsModel");

const createStudent=async(req,res)=>{
     const {name,age,gender,standard,division,address}=req.body; 


 try{
        const newTeacher=new TeacherModel({  //storing data to db
           Name:name,
           Age:age, 
           Gender:gender,
          Standard:standard,
          Division:division,
           city:address.city,
           pin:address.pin
        });
        await newStudent.save();
        const resData={
            Name:newStudent.name
        }
        console.log(resData,"data");               
        res.send({
            message:"Student added successfully",
            data:resData

        })

    }catch(er){
        console.log("error",er);
    }
};    

module.exports={createStudent}