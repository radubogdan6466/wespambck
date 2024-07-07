const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: { type: String },
  message: { type: String },
  room: { type: String },
  entryDate: { type: Date, default: Date.now },
});

const contactSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  room: { type: String },
  entryDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema, "user");
const Contact = mongoose.model("Contact", contactSchema, "contact_form");
const mySchemas = { User: User, Contact: Contact };

module.exports = mySchemas;
