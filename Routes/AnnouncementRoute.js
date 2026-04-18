const express = require("express");
const { createAnnouncement, getAllNotices, deleteNotice } = require("../Controller/AnnouncementController");
const upload = require("../middleware/uploads");

const AnnouncementRouter = express.Router();

AnnouncementRouter.post("/", upload.single("image"), createAnnouncement);
AnnouncementRouter.get("/", getAllNotices);
AnnouncementRouter.delete("/:noticeid", deleteNotice);

module.exports = AnnouncementRouter;

