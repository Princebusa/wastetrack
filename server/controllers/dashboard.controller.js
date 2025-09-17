import User from "../models/user.model.js"
import Report from "../models/report.model.js"



export const getAllUser = async (req, res) => {

    try {
      const user = await User.find();
      res.send({success : true , data : user});
    } catch (error) {
      res.status(500).json({success : false , message: "Server error", error: error.message });
    }
};

export const getAllReview = async (req, res) => {

    try {
      const report = await Report.find();
      res.send({success : true , data : report});
    } catch (error) {
      res.status(500).json({success : false , message: "Server error", error: error.message });
    }
};
  

export const getUser = async (req, res) => {
    const userId = req.params.userid;
    try {
      const user = await User.findById(userId);
      res.send({success : true , data : user});
    } catch (error) {
      res.status(500).json({success : false , message: "Server error", error: error.message });
    }
};

export const getReport = async (req, res) => {
    const reportId = req.params.reportid;
    try {
      const report = await Report.findById(reportId).populate({
        path: "userId",
        select: "username -_id",
      });
      res.send({success : true , data : report});

    } catch (error) {
      res.status(500).json({success : false , message: "Server error", error: error.message });
    }
};