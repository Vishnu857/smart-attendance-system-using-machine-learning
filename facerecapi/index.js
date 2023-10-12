const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors=require("cors")
app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors() )
  const twilio = require("twilio");
  const accountSid = 'ACa042ecbe45bfe3bef6225c4aa2175ae3';
const authToken = '8605e8ca1029a9731adba6bee69232e6';
const twilioPhoneNumber = "+16815885801";
const twilioClient = twilio(accountSid, authToken);

app.use(bodyParser.json());
const port = process.env.PORT || 5000;
const url = "mongodb+srv://vishnu:VueU5Brp66byGA@cluster0.xar7ngm.mongodb.net/smartAttendance?retryWrites=true&w=majority";

// Import the Student model
const Student = require("./studentModel");
const Attendance = require("./AttendanceModel");

app.use(express.json());


var stds=[]
app.get("/students", async (req, res) => {
    try {
      // Use the Student model to fetch all student records and select only the "name" field
      const studentsData = await Student.find({}).select('Name');
  
      // Extract the names from the array of objects
      const studentNames = studentsData.map(student => student.Name);
      stds.push(studentNames)
      res.status(200).json(studentNames);
      console.log(stds);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });

  
  app.get('/abs', async (req, res) => {
    try {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Months are zero-based
        const year = currentDate.getFullYear().toString().slice(-2); // Get the last 2 digits of the year
    
        const formattedDate = `${day}/${month}/${year}`;
        const attendanceOnDate = await Attendance.find({ date: formattedDate });

    // Step 2: Retrieve all student roll numbers
    const allStudentRollNumbers = (await Student.find({}, 'roll_no')).map((student) => student.roll_no);
    

    const absentStudents = allStudentRollNumbers.filter((rollNumber) => {
        return !attendanceOnDate.some((attendance) => attendance.roll_no === rollNumber);
      });

       const absentStudentDetails = await Student.find({ roll_no: { $in: absentStudents } });

      res.status(200).json(absentStudentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
  });
  app.get('/sendsms', async (req, res) => {
    try {
      // Fetch absent students from your API
      const absentStudents = await fetchAbsentStudents();
  
      // Send SMS to each absent student
      for (const student of absentStudents) {
        const { Name, phno } = student;
  
        const message = `Dear ${Name}, you were absent. Please contact us for more details.`;
  
        // Send SMS using Twilio
        await twilioClient.messages.create({
          body: message,
          from: twilioPhoneNumber,
          to: phno,
        });
  
        console.log(`SMS sent to ${Name} (${phno})`);
      }
  
      res.status(200).json({ message: 'SMS sent to absent students' });
    } catch (error) {
      console.error('Error sending SMS:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Function to fetch absent students from your API (replace with your implementation)
  async function fetchAbsentStudents() {
    const response = await fetch('http://localhost:5000/abs');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  

  

// Create a new student record
app.post("/students", async (req, res) => {
  try {
    const { roll_no, name, year } = req.body;
    const student = new Student({
      roll_no,
      name,
      year,
    });

    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Get all student records


// var pres=[]
app.get("/attendance/pres", async (req, res) => {
    try {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Months are zero-based
      const year = currentDate.getFullYear().toString().slice(-2); // Get the last 2 digits of the year
  
      const formattedDate = `${day}/${month}/${year}`;
      console.log("Requested date:", formattedDate);
  
      const attd = await Attendance.find({ date: formattedDate });
      const attdd=attd.map(atg=>atg.roll_no)
    //   pres.push(attdd)
    //   console.log("Attendance records found:", attd);
//   console.log(pres);
      res.status(200).json(attd);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get('/attendance/pres/:date', async (req, res) => {
    try {
      const selectedDate = req.params.date;
  
      // Use selectedDate to fetch attendance data
      const attd = await Attendance.find({ date: selectedDate });
  
      res.status(200).json(attd);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });
  

app.get("/student/:roll_no", async (req, res) => {
  try {
    const {roll_no}=req.params

    const std = await Student.findOne({ roll_no:roll_no});
    res.json(std)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
