const AnnouncementModel = require("../Models/AnnouncementModel");
const cloudinary = require("../config/cloudinary");

// CREATE ANNOUNCEMENT
const createAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description are required" });
    }

    let imageUrl = "";
    if (req.file && req.file.path) {
      imageUrl = req.file.path; // Multer-storage-cloudinary provides the path
    }

    const announcement = await AnnouncementModel.create({
      Title: title,
      Description: description,
      ImageUrl: imageUrl,
    });

    res.status(201).json({
      message: "Announcement added successfully",
      data: announcement
    });
  } catch (err) {
    console.error("Create Announcement Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// GET ALL ANNOUNCEMENTS
const getAllNotices = async (req, res) => {
  try {
    const announcements = await AnnouncementModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Announcements fetched successfully",
      data: announcements
    });
  } catch (error) {
    console.error("Fetch Announcements Error:", error);
    res.status(500).json({ message: "Error fetching announcements" });
  }
};

// DELETE ANNOUNCEMENT
const deleteNotice = async (req, res) => {
  try {
    const { noticeid } = req.params;
    const announcement = await AnnouncementModel.findById(noticeid);
    
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    // Optional: Delete from cloudinary if ImageUrl exists
    // if (announcement.ImageUrl) {
    //   const publicId = announcement.ImageUrl.split('/').pop().split('.')[0];
    //   await cloudinary.uploader.destroy(publicId);
    // }

    await AnnouncementModel.findByIdAndDelete(noticeid);
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (err) {
    console.error("Delete Announcement Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createAnnouncement, getAllNotices, deleteNotice };

