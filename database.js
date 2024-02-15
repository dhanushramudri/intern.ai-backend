const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const jobSchema = new mongoose.Schema({
  job_title: String,
  company_name: String,
  location: String,
  job_description: String,
  requirements: String,
  company_logo_url: String,
  job_details_keywords: [String],
  job_details_links: {
    website: String,
    linkedin: String,
    all_job_openings: String,
  },
});

const Job = mongoose.model("Job", jobSchema);

// Use function keyword to allow binding 'this'
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("User", userSchema);
app.get("/", (req, res) => {
  res.send("Hello, this is the backend page");
});

app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ name, email, password: hashedPassword });

    const savedUser = await newUser.save();
    console.log("User saved to MongoDB:", savedUser);

    res.json({ message: "Data received and saved successfully" });
  } catch (error) {
    console.error("Error saving user to MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour, you can adjust this value
    });
    console.log(token);

    return res.json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/scrape-and-save", async (req, res) => {
  try {
    // Retrieve the jobs from MongoDB or any other storage
    const jobs = await Job.find(); // Assuming you are using Mongoose and have a Job model

    // Send the jobs as the response
    res.json(jobs);
  } catch (error) {
    console.error(`Error fetching jobs: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // Update the write concern to the appropriate value
  writeConcern: {
    w: "majority",
    wtimeout: 0,
    j: true,
  },
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.post("/scrape-and-save", async (req, res) => {
  try {
    const all_jobs_data = req.body; // Assuming the scraped data is sent in the request body

    // Save the scraped jobs to MongoDB
    if (all_jobs_data.length > 0) {
      all_jobs_data.forEach(async (jobData) => {
        try {
          const job = new Job(jobData);
          await job.save();
          console.log(`Job saved to MongoDB: ${jobData.job_title}`);
        } catch (error) {
          console.error(`Error saving job to MongoDB: ${error.message}`);
        }
      });

      res.json({ message: "Scraped jobs saved to MongoDB successfully" });
    } else {
      res.json({ message: "No job items to save." });
    }
  } catch (error) {
    console.error(`An error occurred during scraping and saving: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
