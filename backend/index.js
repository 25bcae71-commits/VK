const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection (replace with your Atlas URL)
mongoose.connect(process.env.MONGO_URI)
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
app.post("/contact", async (req, res) => {
  const data = new Contact(req.body);
  await data.save();
  res.send("Data Saved");
});

app.get("/contacts", async (req, res) => {
  const contacts = await Contact.find().sort({ _id: -1 });
  res.json(contacts);
});

// Server (IMPORTANT FOR RENDER)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});