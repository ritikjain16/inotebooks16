const express = require("express");
const router = express.Router();
const NotesList = require("../models/Notes");
const UserList = require("../models/Users");
var fetchuser = require("../middleware/fetchuser");

// create anote
router.post("/createnote", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const note = await NotesList.create({
      userid: req.user.id,
      title,
      description,
      tag,
    });
    res.status(200).send(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/getallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await NotesList.find({ userid: req.user.id });
    res.status(200).send(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/updatenote/:id", async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const note = await NotesList.updateOne(
      { _id: req.params.id },
      { $set: { title, description, tag } }
    );
    res.status(200).send(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/deletenote/:id", async (req, res) => {
  try {
    const note = await NotesList.findOneAndDelete(
      { _id: req.params.id },
    );
    res.status(200).send({ mess: "Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
