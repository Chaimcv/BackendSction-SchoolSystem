const StudentModel=require("../Models/StudentsModel");
//const { get } = require("../Routes/StudentsRoute");

const createStudent=async(req,res)=>{
     const {name,age,email,password,gender,standard,guardian,guardian_phonenumber,division,address,pincode}=req.body; 

//password generation
 try{
        const newStudent=new StudentModel({  //storing data to db
           Name:name,
           Email:email,
           Password:password,
           Age:age, 
           Gender:gender,
          Standard:standard,
          Division:division,
          Guardian:guardian,
          Guardian_phonnumber:guardian_phonenumber,
           Address:address,
           Pincode:pincode,
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


//get data from db 
const getStudents=async(req,res)=>{
    try{
        const StudentData=await StudentModel.find();
        res.send({
            message:"Students data fetched successfully",
            data:StudentData
    })
    }catch(error){
        res.send({
            message:"Error",
        })
        console.log(error,"error");
    }
    
};

//get particular data with id
const getStudentById=async(req,res)=>{
    try{
        const id=req.params.studentid;

        const Student=await StudentModel.findById(id);
        if(!Student){
            res.send({
                message:"Teachers data not available"
            })
        }
        res.send({
            message:"Teacher datafetched successfully",
            data:Student
        })
    }catch(error){
        res.send({
            message:"Error",
        })
        console.log(error,"error occ");
    }
};



//update
const updateStudent=async(req,res)=>{
    const {name,age,gender,address,pincode,guardian,guardian_phonenumber,standard,division}=req.body; 
    try{
       const id=req.params.studentid;
       const isStudentAvailable=await StudentModel.findById(id);
       if(!isStudentAvailable){
        res.send({
            message:"Student not available"
        })
       }

       const updateStudent=await StudentModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    );
    res.send({
        message:"updated studennt data",
        data:updatedStudent
    })
    }catch(error){
   res.send({
    message:"Not updated"
   })
    }
};
//delete
const deleteStudent=async(req,res)=>{
  const id=req.params.studentid;
    const StudentAvailable=await StudentModel.findById(id); //or  await TeacherModel.deleteOne({_id:id});
    if(!StudentAvailable){
        res.send({
            message:"No Student"
        })
    }
   await StudentModel.findByIdAndDelete(id);
   res.send({
    message:"Student data deleted successfully"
   })
}

module.exports={createStudent,getStudentById,getStudents,deleteStudent,updateStudent}