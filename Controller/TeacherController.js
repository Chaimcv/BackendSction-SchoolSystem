//Teacher manipulation
const TeacherModel=require("../Models/TeacherModel");
const crypto = require('crypto');
const generator=require("generate-password");

                                      //http://127.0.0.1:8000/teacher
//posting data to db-(teachers)
const createTeacher=async(req,res)=>{              
    console.log("api called");

//password creation
const password = generator.generate({
    length: 10,
    numbers: true
});

console.log(password);

    const {name,email,pin,city,phonenumber,subject,standard}=req.body;   //data from frontend-- api
      
    if(!name){
        return res.send({
                message:"Please enter your name"
            })
       }
    try{
        const newTeacher=new TeacherModel({  //storing data to db
           name,    //if both names are same then this is enough
           Email:email,
           Password:password,
           city:city,
           pin:pin,
        //    city:address.city,
        //    pin:address.pin,
           phoneNumber:phonenumber, 
           subject:subject,
          standard:standard
        });
        await newTeacher.save();
        const resData={
            name:newTeacher.name,
            email:newTeacher.Email,
            password:newTeacher.Password

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
//Login
const TeacherLogin=async(req,res)=>{
    const{email,password}=req.body;
    try {
        if(!email||!password){
            res.send({
                message:"Enter Valid email and password"
            })
        }
        const fetchedTeacherData=await TeacherModel.findOne({email:email});
        if(!fetchedTeacherData){
            res.send({
                message:"No matching email found"
            })
        }
        if(fetchedTeacherData.password===password)
        {
            res.send({
                message:"Login Successful",
                data:{
                    email:fetchedTeacherData.email
                    //image
                }
            })
        }


function generateRandomToken(length = 32) {
  // Generate random bytes and convert to a hex string
  return crypto.randomBytes(length).toString('hex');
}
const token = generateRandomToken();
console.log(token);



    } catch (error) {
        
    }
}

module.exports={createTeacher,getTeachers,getTeacherById,updateTeacher,deleteTeacher,TeacherLogin}