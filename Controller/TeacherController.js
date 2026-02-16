//Teacher manipulation
const TeacherModel=require("../Models/TeacherModel");

                                      //http://127.0.0.1:8000/teacher
//posting data to db-(teachers)
const createTeacher=async(req,res)=>{              
    console.log("api called");
    const {name,pin,city,phonenumber,subject,standard}=req.body;   //data from frontend-- api
      
    if(!name){
        return res.send({
                message:"Please enter your name"
            })
       }
    try{
        const newTeacher=new TeacherModel({  //storing data to db
           name:name,
           city:address.city,
           pin:address.pin,
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
};

//get data from db 
const getTeachers=async(req,res)=>{
    try{
        const TeachersData=await TeacherModel.find();
        res.send({
            message:"Teachers data fetched successfully",
            data:TeachersData
    })
    }catch(error){
        res.send({
            message:"Error",
        })
        console.log(error,"error occ");
    }
    
};

//get particular data with id
const getTeacherById=async(req,res)=>{
    try{
        const id=req.params.teachersid;

        const Teacher=await TeacherModel.findById(id);
        if(!Teacher){
            res.send({
                message:"Teachers data not available"
            })
        }
        res.send({
            message:"Teacher datafetched successfully",
            data:Teacher
        })
    }catch(error){
        res.send({
            message:"Error",
        })
        console.log(error,"error occ");
    }
};



//update
const updateTeacher=async(req,res)=>{
    const {name,address,phonenumber,subject,standard}=req.body; 
    try{
       const id=req.params.teacherid;
       const isTeacherAvailable=await TeacherModel.findById(id);
       if(!isTeacherAvailable){
        res.send({
            message:"Teacher not available"
        })
       }

       const updatedTeacher=await TeacherModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    );
    res.send({
        message:"updated teacher data",
        data:updatedTeacher
    })
    }catch(error){
   res.send({
    message:"Not updated"
   })
    }
};
//delete
const deleteTeacher=async(req,res)=>{
  const id=req.params.teacherid;
    const TeacherAvailable=await TeacherModel.findById(id); //or  await TeacherModel.deleteOne({_id:id});
    if(!TeacherAvailable){
        res.send({
            message:"Not Teacher"
        })
    }
   await TeacherModel.findByIdAndDelete(id);
   res.send({
    message:"Teacher data deleted successfully"
   })
}


module.exports={createTeacher,getTeachers,getTeacherById,updateTeacher,deleteTeacher}