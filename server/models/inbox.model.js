import mongoose from "mongoose";
import moment from "moment";

const inboxSchema = new mongoose.Schema({
    reportId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
        required: true
    },
     createdAt: {
        type: String,
        default: () => moment().format("YYYY-MM-DD HH:mm:ss") // store formatted
    }
});

const Inbox = mongoose.model('Inbox' , inboxSchema);
export default Inbox;