const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
    Name: {
        type: String
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Age: {
        type: Number
    },
    Gender: {
        type: String
    },
    Standard: {
        type: Number
    },
    Division: {
        type: String
    },
    Guardian: {
        type: String
    },
    Guardian_Phonenumber: {
        type: Number
    },
    Address: {
        type: String
    },
    Pincode: {
        type: String
    },
    ProfileImageUrl: {
        type: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Students", StudentSchema);