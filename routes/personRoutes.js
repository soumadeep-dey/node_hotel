const express = require("express");
const router = express.Router();
const personController = require("../controllers/personController");

//POST route to add person
router.post("/", personController.postNewPerson);

//GET method to get the person
router.get("/", personController.getAllPerson);

//GET method to get person by work type
router.get("/:workType", personController.getPersonByWork);

//PUT method to update person details
router.put("/:id", personController.putPerson);

//DELETE method to delete a person
router.delete("/:id", personController.deletePerson);

//Export router
module.exports = router;
