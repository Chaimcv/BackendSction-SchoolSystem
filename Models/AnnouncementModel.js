const mongoose = require("mongoose");
const AnnouncementSchema = mongoose.Schema({
    ImageUrl: {
        type: String
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("announcement", AnnouncementSchema);

