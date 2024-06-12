const express = require("express");
const router = express.Router();
const personController = require("../controllers/personController");
const jwtAuthMiddleware = require("../middleware/jwt");

//POST route to add person
router.post("/signup", personController.signup);

//Login route
router.post("/login", personController.login);

//Profile route
router.get("/profile", jwtAuthMiddleware, personController.profile);

//GET method to get the person
router.get("/", jwtAuthMiddleware, personController.getAllPerson);

//GET method to get person by work type
router.get("/:workType", jwtAuthMiddleware, personController.getPersonByWork);

//PUT method to update person details
router.put("/:id", jwtAuthMiddleware, personController.putPerson);

//DELETE method to delete a person
router.delete("/:id", jwtAuthMiddleware, personController.deletePerson);

//Export router
module.exports = router;
