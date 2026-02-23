const mongoose=require("mongoose");
const AnnouncementSchema=mongoose.Schema({
    Image:{
    type:String
    },
    Text:{
        type:String
    }
},
{
    Timestamp:true
})
mongoose.exports=mongoose.model("announcement",AnnouncementSchema);
