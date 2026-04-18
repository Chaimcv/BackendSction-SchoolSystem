const StudentModel=require("../Models/StudentsModel");
//const { get } = require("../Routes/StudentsRoute");
const generator=require("generate-password");
const mongoose=require("mongoose");
const crypto=require("crypto");
// const bycrpt=require("bcryptjs");


const createStudent = async (req, res) => {
  const { name, age, email, gender, standard, guardian, guardian_phonenumber, division, address, pincode } = req.body;

  // Password generation
  const password = generator.generate({
    length: 10,
    numbers: true
  });

  try {
    let profileImageUrl = "";
    if (req.file && req.file.path) {
      profileImageUrl = req.file.path;
    }

    const newStudent = new StudentModel({
      Name: name,
      Email: email,
      Password: password,
      Age: age,
      Gender: gender,
      Standard: standard,
      Division: division,
      Guardian: guardian,
      Guardian_Phonenumber: guardian_phonenumber,
      Address: address,
      Pincode: pincode,
      ProfileImageUrl: profileImageUrl
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student added successfully",
      data: { Name: newStudent.Name, ProfileImageUrl: newStudent.ProfileImageUrl }
    });

  } catch (er) {
    console.error("Create Student Error:", er);
    res.status(500).json({ message: "Error adding student", error: er.message });
  }
};

// get data from db 
const getStudents = async (req, res) => {
  try {
    const StudentData = await StudentModel.find().sort({ createdAt: -1 });
    res.send({
      message: "Students data fetched successfully",
      data: StudentData
    });
  } catch (error) {
    res.status(500).send({ message: "Error" });
    console.log(error, "error");
  }
};

// get particular data with id
const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const Student = await StudentModel.findById(id);
    if (!Student) {
      return res.status(404).send({ message: "Student data not available" });
    }
    res.send({
      message: "Student data fetched successfully",
      data: Student
    });
  } catch (error) {
    res.status(500).send({ message: "Error" });
    console.log(error, "error occ");
  }
};

// update
const updateStudent = async (req, res) => {
  try {
    const id = req.params.studentid;
    const updateData = { ...req.body };

    if (req.file && req.file.path) {
      updateData.ProfileImageUrl = req.file.path;
    }

    const updatedStudent = await StudentModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Updated student data",
      data: updatedStudent
    });
  } catch (error) {
    console.error("Update Student Error:", error);
    res.status(500).json({ message: "Not updated" });
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

//login
const jwt=require("jsonwebtoken");
const StudentLogin=async(req,res)=>{
    const{inputtedEmail,inputtedPassword}=req.body;
    console.log(inputtedEmail,"input email at controller");
    try{
        if(!inputtedEmail||!inputtedPassword){
           return res.send({
                message:"Enter email and password"
            })
        }
      const fetchStudentData=await StudentModel.findOne({Email:inputtedEmail});
      if(!fetchStudentData){
        return res.send({
            message:"no matching email found"
        })
      }
      const isMatch=inputtedPassword===fetchStudentData.Password;
      if(!isMatch){
        return res.send({
            message:"Invalid Password"
        })
      }
      const token = jwt.sign(
        { id: fetchStudentData._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      
      res.send({
       message: "Login successful",
       token: token,
        id:fetchStudentData._id,
        name:fetchStudentData.Name
      });
    } catch (error) {

  res.send({
   message: "Error in Student login"
  });

}
}

module.exports={createStudent,getStudentById,getStudents,deleteStudent,updateStudent,StudentLogin}