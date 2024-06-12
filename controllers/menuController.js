const MenuItem = require("../models/MenuItem");

const menuController = {
  postMenuItem: async (req, res) => {
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
  },
  getMenu: async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log("Menu Items fetched.");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal Server Error");
    }
  },
  getMenuByTaste: async (req, res) => {
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
  },
  putMenu: async (req, res) => {
    try {
      const menuItemId = req.params.id;
      const updatedMenuItem = req.body;

      const response = await MenuItem.findByIdAndUpdate(
        menuItemId,
        updatedMenuItem
      );

      if (!response) {
        return res.status(404).json({ error: "Item not found" });
      }

      console.log("Menu Item updated");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteMenu: async (req, res) => {
    try {
      const menuItemId = req.params.id;
      const response = await MenuItem.findByIdAndDelete(menuItemId);

      if (!response) {
        return res.status(404).json({ error: "Item not found" });
      }

      console.log("Menu Item Deleted");
      res.status(200).json(response);
    } catch {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = menuController;
