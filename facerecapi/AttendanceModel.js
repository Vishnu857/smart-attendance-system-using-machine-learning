const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  date:{
    type:String,
    required:true
  },
  roll_no: {
    type: String,
    required: true,
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
