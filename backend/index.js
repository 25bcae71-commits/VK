require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model("Contact", ContactSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Contact Form POST (with validation)
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).send("All fields are required");
    }

    if (message.length < 10) {
      return res.status(400).send("Message must be at least 10 characters");
    }

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.send("Message sent successfully");

  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// Get all contacts
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ _id: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).send("Error fetching contacts");
  }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});