const express = require("express");
const router = express.Router();
const schemas = require("../models/schemas");

router.post("/contact/:a", async (req, res) => {
  const { user, message, room } = req.body;
  const action = req.params.a;

  switch (action) {
    case "send":
      const contactData = { user: user, message: message, room: room };
      const newContact = new schemas.Contact(contactData);
      const saveContact = await newContact.save();
      if (saveContact) {
        // res.send("Message sent. Thank you.");
      } else {
        res.send("Failed to send message.");
      }
      break;

    default:
      res.send("Invalid Request");
      break;
  }

  res.end();
});
// Endpoint pentru a obține toate mesajele de contact
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await schemas.Contact.find({});
    res.json(contacts);
  } catch (error) {
    res.status(500).send("Error fetching contacts");
  }
});
module.exports = router;
