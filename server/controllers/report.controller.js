import { validationResult } from "express-validator";
import fileUpload from "../config/imageKit.config.js";
import User from "../models/user.model.js";
import Report from "../models/report.model.js";

export const addReport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { latitude, longitude, description } = req.body;

  const file = req.file;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    const imageUrl = await fileUpload(
      file.buffer,
      `${user.username}_wasteImage`
    );

    const report = new Report({
      userId,
      location: {
        coordinates: [longitude, latitude],
      },
      imageUrl: imageUrl.url,
      description,
    });

    await report.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { reports: report._id } },
      { new: true }
    );

    updatedUser.save();

    res.send({ success: true, message: "reporte succesfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getUserReports = async (req, res) => {
  try {
    const user = await Report.find();
    res.send({ success: true, data: user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const updateStatus = async (req, res) => {
  const { postId } = req.params;
  const updateReport = await Report.findByIdAndUpdate(
    postId,
    {
      $set: { status: "in-progress" },
    },
    { new: true }
  );

  res.send({ success: true }, { message: "progress updated " });
  try {
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const compeleteStatus = async (req, res) => {
  const { postId } = req.params;
  const file = req.file;

  const imageUrl = await fileUpload(file.buffer, `${req.user.id}_cleanImage`);

  const updateReport = await Report.findByIdAndUpdate(postId, {
    $set: { cleanupProofUrl: imageUrl.url, status: "resolved" },
  });

  const userId = updateReport.userId;
  const result = await User.findByIdAndUpdate(
    userId,
    { $inc: { points: 10 } }, // increment points by 10
    { new: true }
  );
  console.log(result);

  res.send({ success: true, message: "progress updated " });
  try {
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
