const mongoose=require("mongoose");
const AnnouncementSchema=mongoose.Schema({
    Image:{
    type:
    },
    Text:{
        type:String
    }
},
{
    Timestamp:true
})
mongoose.exports=mongoose.model("announcement",AnnouncementSchema);
