const AnnouncementModel=require("../Models/AnnouncementModel");
const mongoose=require("mongoose");

const createNotice=async(req,res)=>{
    console.log("annoucements");
    const {image,text}=req.body;
    try {
      const newNotice=new AnnouncementModel({
        Image:image,
        Text:text
      });
      await newNotice.save();
      const resData={
        image:newNotice.Image,
        text:newNotice.Text
      } 
      console.log(resData);
      res.send({
        message:"notice added",
        data:resData
      }); 
    } catch (error) {
      console.log(error,"notice error");  
    }
};

const getAllNotices=async(req,res)=>{
    try{
        const AllNotices=await AnnouncementModel.find();
        res.send({
            message:"Notices fetched successfully",
            data:AllNotices
    })
    }catch(error){
        res.send({
            message:"Error",
        })
        console.log(error,"error notice");
    }
    
}
const deleteNotice=async(req,res)=>{
  const id=req.params.noticeid;
    const IsNotice=await AnnouncementModel.findById(id); 
    if(!IsNotice){
        res.send({
            message:"No notice"
        })
    }
   await AnnouncementModel.findByIdAndDelete(id);
   res.send({
    message:"Notice deleted successfully"
   })
}
module.exports={createNotice,getAllNotices,deleteNotice}
