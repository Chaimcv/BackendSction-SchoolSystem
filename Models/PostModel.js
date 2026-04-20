const mongoose=require("mongoose");
const PostSchema=mongoose.Schema({
Title:{
    type:String
},
Description:{
    type:String
},
PostImageUrl:{
    type:String
},
Comment:{
    type:String
},
Like:{
    type:
}
})
module.exports=mongoose.model("Posts",PostSchema);