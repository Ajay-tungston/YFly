const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const authAdmin = require("./Routes/authAdmin");
const authUser = require("./Routes/authUser");
const scholarshipRoutes = require("./Routes/authScholarship");
const courseRoutes = require("./Routes/authCourse");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;
const dbConnectionString = process.env.CONNECTION_STRING;
// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false, // ✅ DISABLE this specific policy
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", process.env.CLIENT_URL],
      },
    },
  })
);

// app.use(cors());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
}, express.static('uploads'));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true })); // Parses form-data

// Routes
app.use("/admin", authAdmin);
app.use("/user", authUser);
app.use("/scholarships", scholarshipRoutes);
app.use("/courses", courseRoutes);
app.use("/university", require("./Routes/universityRoutes"));
app.use("/profile-matcher", require("./Routes/profileMatcherRoutes"));
app.use("/application", require("./Routes/apllicationRoutes"));
app.use("/service", require("./Routes/serviceRotes"));

// Connect to the database
mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected successfully"))
  .catch((error) => {
    console.error("DB connection error:", error);
    process.exit(1);
  });
// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
// only do the functionslity of this part
