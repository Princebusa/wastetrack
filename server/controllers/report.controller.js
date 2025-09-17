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

        const imageUrl = await fileUpload(file.buffer, `${user.username}_wasteImage`);
      
        const report = new Report({
          userId,
          location: {
            coordinates: [longitude, latitude],
          },
          imageUrl: imageUrl.url,
          wasteType: "Bags",
          description: description
        });
      
        await report.save();

        const updatedUser = await User.findOneAndUpdate({_id : userId} , 
          { $push: { reports : report._id } },
          {new : true}
        );

        updatedUser.save();
      
        res.send(report);
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

};
