const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  roll_no: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  phno:{
    type:String,
    required:true
  }
});

const Student = mongoose.model("student_details", studentSchema);

module.exports = Student;
