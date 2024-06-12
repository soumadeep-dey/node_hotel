const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

//POST method to create a new menu item
router.post("/", menuController.postMenuItem);

//GET method to read all menu items
router.get("/", menuController.getMenu);

//GET method to read menu items by taste
router.get("/:tasteType", menuController.getMenuByTaste);

//PUT method to update Menu item
router.put("/:id", menuController.putMenu);

//DELETE method to delete a Menu item
router.delete("/:id", menuController.deleteMenu);

module.exports = router;
