const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ["sweet", "spicy", "sour"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false, 
    //If no user input, default value will be set
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});
//If we don't explicitly mention collection name, then moongoose will pluralize it. e.g.: Person -> People
// const MenuItem = mongoose.model("MenuItem", menuItemSchema);

//Explicity collection name
const MenuItem = mongoose.model("MenuItem", menuItemSchema, "menuitems");

module.exports = MenuItem;
