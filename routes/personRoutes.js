const express = require("express");
const router = express.Router();
//Import DB model
const Person = require("../models/Person.js");

//POST route to add person
router.post("/", async (req, res) => {
  try {
    const data = req.body; //from bodyParser

    //Create Person document using Mongoose model & directly pass the data to the model
    const newPerson = new Person(data);

    //Save the new Person to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET method to get person by work type
router.get("/:workType", async (req, res) => {
  try {
    //extract the work type from the URL paramater
    const workType = req.params.workType;
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const response = await Person.find({ work: workType });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//PUT method to update person details
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData
    );

    // Handling for empty or id not found
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//DELETE method to delete a person
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const deletedPerson = await Person.findByIdAndDelete(personId);

    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data deleted");
    res.status(200).json(deletedPerson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Export router
module.exports = router;
