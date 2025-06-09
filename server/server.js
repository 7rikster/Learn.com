require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
const mediaRoutes = require("./routes/instructor-routes/media-routes");
const InstructorCourseRoutes = require("./routes/instructor-routes/course-routes");
const StudentViewCourseRoutes = require("./routes/student-routes/course-routes");
const StudentViewOrderRoutes = require("./routes/student-routes/order-routes");
const StudentCoursesRoutes = require("./routes/student-routes/student-courses-routes");
const StudentCourseProgressRoutes = require("./routes/student-routes/course-progress-routes");

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

//database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((e) => console.log(e));

//routes configuration
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor/course", InstructorCourseRoutes);
app.use("/student/course", StudentViewCourseRoutes);
app.use("/student/order", StudentViewOrderRoutes);
app.use("/student/courses-bought", StudentCoursesRoutes);
app.use("/student/course-progress", StudentCourseProgressRoutes);
app.get('/ping', (req, res) => {
  res.send('pong');
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
