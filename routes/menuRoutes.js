const MenuItem = require("../models/MenuItem.js");
const express = require("express");
const router = express.Router();

//POST method to create a new menu item
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const savedMenuItem = await newMenuItem.save();
    console.log("New Menu Item Saved");
    res.status(200).json(savedMenuItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET method to read all menu items
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Menu Items fetched.");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

//GET method to read menu items by taste
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (
      tasteType === "sweet" ||
      tasteType === "sour" ||
      tasteType === "spicy"
    ) {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("data fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//PUT method to update Menu item
router.put("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const updatedMenuItem = req.body;

    const response = await MenuItem.findByIdAndUpdate(
      menuItemId,
      updatedMenuItem
    );

    if (!response) {
      res.status(404).json({ error: "Item not found" });
    }

    console.log("Menu Item updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//DELETE method to delete a Menu item
router.delete("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuItemId);

    if (!response) {
      res.status(404).json({ error: "Item not found" });
    }

    console.log("Menu Item Deleted");
    res.status(200).json(response);
  } catch {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
