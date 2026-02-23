const express=require("express");
const { createNotice,getAllNotices,deleteNotice }=require("../Controller/AnnouncementController");

const AnnouncementRouter=express.Router();
AnnouncementRouter.post("/",createNotice);
AnnouncementRouter.get("/",getAllNotices);
AnnouncementRouter.delete("/id",deleteNotice);
module.exports=AnnouncementRouter;
