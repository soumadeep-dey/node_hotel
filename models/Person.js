const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    //data must be within these 3 values
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    //must be unique email in every document
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

//Create Person Model
const Person = mongoose.model("Person", personSchema);

//Exprt model
module.exports = Person;
