const User = require('../Models/userSchema');
const Otp=require('../Models/otpSchema')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendResetEmail = require('../utils/mailer'); 
const mongoose=require('mongoose')
const nodemailer = require("nodemailer");


exports.registerUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { first_name, last_name, phone_number, email, password } = req.body;

    if (!first_name || !last_name || !phone_number || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique user ID
    const user_id = new mongoose.Types.ObjectId().toString(); 

    // Create a new user
    const newUser = new User({
      user_id, 
      first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
    });

    // Save to database
    await newUser.save();

    console.log(" User saved successfully:", newUser);
    res.status(201).json({ message: "User created successfully", user_id: newUser.user_id });

  } catch (error) {
    console.error(" Error saving user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};








exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if the user exists in the database
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Email not found. Please register first." });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 minutes

    // Store OTP in the database (update if it exists)
    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    // Configure Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tungstonyfly@gmail.com",
        pass: "ezhm xton ryiw hffz", 
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email message options
    const mailOptions = {
      from: "tungstonyfly@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(otp)
    res.status(200).json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};

 

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Retrieve OTP from the database
    const storedOTP = await Otp.findOne({ email });

    if (!storedOTP) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    // Check if OTP is expired
    if (storedOTP.expiresAt < new Date()) {
      await Otp.deleteOne({ email }); // Remove expired OTP from DB
      return res.status(400).json({ message: "OTP expired. Request a new one." });
    }

    // Ensure OTP is compared as a string
    if (storedOTP.otp.toString() !== otp.toString()) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    // OTP is correct - delete it after verification
    await Otp.deleteOne({ email });

    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if it's the user's first login
    console.log("User firstLogin status:", user.firstLogin); // Log firstLogin status
    // if (user.firstLogin) {
    //   user.firstLogin = false; // Update firstLogin to false
    //   await user.save();
    // }
    //   const refreshToken = jwt.sign(
    //     { email },
    //     process.env.REFRESHTOKEN_SECRET,
    //     { expiresIn: "7d" }
    //   );
  
    //   res.cookie("jwt", refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    //     sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax'
    //   });
    //   return res.status(200).json({ firstLogin: true, token ,});
    // }

    // If not the first login, generate a token and redirect to home
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ firstLogin:user.firstLogin, token,email });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Failed to verify OTP", error: error.message });
  }
};


// 2. Register Countries
exports.registerCountries = async (req, res) => {
  try {
    const { user_id, countries } = req.body;
    const registeredUser = await User.findOneAndUpdate(
      { user_id },
      { $set: { countries } },
      { new: true }
    );
    res.status(200).json({ message: 'Countries registered', registeredUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating countries', error });
  }
};

// 3. Register Degree and Education Details
exports.registerDegree = async (req, res) => {
  try {
    const { user_id, degree, education_details, work_experience } = req.body;
    const registeredUser = await User.findOneAndUpdate(
      { user_id },
      { $set: { degree, education_details, work_experience } },
      { new: true }
    );
    res.status(200).json({ message: 'Degree details registered', registeredUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating degree details', error });
  }
};

// 4. Register Majors
exports.registerMajors = async (req, res) => {
  try {
    const { user_id, majors } = req.body;
    const registeredUser = await User.findOneAndUpdate(
      { user_id },
      { $set: { majors } },
      { new: true }
    );
    res.status(200).json({ message: 'Majors registered', registeredUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating majors', error });
  }
};

// 5. Register Proficiency Exam
exports.registerProficiencyExam = async (req, res) => {
  try {
    const { user_id, proficiency_exam } = req.body;
    const registeredUser = await User.findOneAndUpdate(
      { user_id },
      { $set: { proficiency_exam } },
      { new: true }
    );
    res.status(200).json({ message: 'Proficiency exam registered', registeredUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating proficiency exam', error });
  }
};


// 6. Register Academic Test
exports.registerAcademicTest = async (req, res) => {
  try {
    const { user_id, academic_test } = req.body;
    const registeredUser = await User.findOneAndUpdate(
      { user_id },
      { $set: { academic_test } },
      { new: true }
    );
    res.status(200).json({ message: 'Academic test registered', registeredUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating academic test', error });
  }
};

// User Login
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if email exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Verify password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Respond with token
//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         user_id: user._id,
//         email: user.email,
//         first_name: user.first_name,
//         last_name: user.last_name,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong", error });
//   }
// };

// User Details

exports.saveUserDetails = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const {
      email,
      countries,
      degree,
      education_details,
      work_experience,
      majors,
      proficiency_exam,
      academic_test,
      mainCriteria,
    } = req.body;
console.log(req.body)
    if (!email) {
      return res.status(400).json({ message: "Email is required to update details" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Pre-process numeric fields in education_details
    if (education_details) {
      education_details.percentage =
        education_details.percentage === "" ? undefined : Number(education_details.percentage);
      education_details.scores =
        education_details.scores === "" ? undefined : Number(education_details.scores);
    }

    // Pre-process numeric fields in work_experience
    if (work_experience) {
      work_experience.months_of_experience =
        work_experience.months_of_experience === "" ? undefined : Number(work_experience.months_of_experience);
    }

    // Pre-process fields in proficiency_exam
    if (proficiency_exam) {
      // Convert empty string to undefined for enum field
      proficiency_exam.exam_name =
        proficiency_exam.exam_name === "" ? undefined : proficiency_exam.exam_name;
      proficiency_exam.score =
        proficiency_exam.score === "" ? undefined : Number(proficiency_exam.score);
    }

    // Pre-process fields in academic_test
    if (academic_test) {
      // Convert empty string to undefined for enum field
      academic_test.test_name =
        academic_test.test_name === "" ? undefined : academic_test.test_name;
      academic_test.verbal_score =
        academic_test.verbal_score === "" ? undefined : Number(academic_test.verbal_score);
      academic_test.quant_score =
        academic_test.quant_score === "" ? undefined : Number(academic_test.quant_score);
    }

    // Update the user details (only update if new value is provided)
    user.countries = countries || user.countries;
    user.degree = degree || user.degree;
    user.education_details = education_details || user.education_details;
    user.work_experience = work_experience || user.work_experience;
    user.majors = majors || user.majors;
    user.proficiency_exam = proficiency_exam || user.proficiency_exam;
    user.academic_test = academic_test || user.academic_test;
    user.mainCriteria = mainCriteria || user.mainCriteria;
    user.firstLogin=false
    await user.save();

    console.log("User details updated successfully:", user);
    res.status(200).json({ message: "User details updated successfully", user });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



//Update user details

exports.updateUserDetails = async (req, res) => {
  try {
    const { user_id } = req.params;
    const updateData = req.body;

    // Validate user_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Remove fields that shouldn't be updated
    const restrictedFields = ['_id', 'user_id', 'email', 'password', 'firstLogin'];
    restrictedFields.forEach(field => delete updateData[field]);

    // Find the user by ID and update
    const updatedUser = await User.findOneAndUpdate(
      { user_id: new mongoose.Types.ObjectId(user_id) },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User details updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user details:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    
    res.status(500).json({ message: 'Internal server error' });
  }
};

 //Fetches user details
exports.getUserDetails = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    // Find the user by email
    const user = await User.findOne({ email }).populate({
      path: "appliedCourses",
      populate: {
        path: "course",
        select: "university_name course_level discipline area_of_study",
        populate: {
          path: "university_name",
          select: "university_name ",
        }
      },
    }).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Return the user details as JSON
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// 1. Forgot password (send reset link)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Create reset password link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send reset password email
    await sendResetEmail(email, resetLink);

    res.status(200).json({ message: 'Reset link sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// 2. Reset password (using the token)
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user by ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Invalid or expired token', error: error.message });
  }
};