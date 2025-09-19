import Inbox from "../models/inbox.model.js";
import express from "express";
const router = express.Router();
import Report from '../models/report.model.js';

router.get("/", async (req, res) => {
  try {
    const inboxs = await Inbox.find({status : "reported"}).populate({
      path: "reportId", // field name in User schema
      select: "description _id", // only include title, description and exclude _id
    });
    res.status(200).json({ success: true, data: inboxs });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

router.post("/:inboxId", async (req, res) => {
  const { inboxId } = req.params;
  const { type } = req.body;
  try {
    const reportId = await Inbox.findById(inboxId);
    console.log(reportId.reportId);
    
    if (type === "reject") {
        await Report.findOneAndDelete(reportId.reportId);
        await Inbox.findOneAndDelete(inboxId);
        return res.status(200).json({ success: true, message: "Report rejected and deleted" });
    }


     const updateReport = await Report.findByIdAndUpdate(
    reportId.reportId,
    {
      $set: { status: "in-progress" },
    });
    await Inbox.findOneAndDelete(inboxId);
    res.status(200).json({ success: true, message: "accept" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

export default router;
