const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model("Contact", ContactSchema);

// Routes
// Routes
app.post("/contact", async (req, res) => {
  const data = new Contact(req.body);
  await data.save();
  res.send("Data Saved");
});

app.get("/contacts", async (req, res) => {
  const contacts = await Contact.find().sort({ _id: -1 });
  res.json(contacts);
});

// Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});