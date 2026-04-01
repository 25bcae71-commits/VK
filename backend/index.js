require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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
app.get("/", (req, res) => {
  res.send("Server is running");
});

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});