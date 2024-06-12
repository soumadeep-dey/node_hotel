const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// pre is mongoose middleware function
personSchema.pre("save", async function (next) {
  const person = this;

  // Hash the pass only if it has been modified or new
  if (!person.isModified("password")) return next();

  try {
    //Hash pwd generate
    const salt = await bcrypt.genSalt(10);

    //hash pass
    const hassedPassword = await bcrypt.hash(person.password, salt);
    person.password = hassedPassword;

    next();
  } catch (err) {
    return next(err);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    /* 
    1.extract salt from saved password
    2.(salt + params pass)--> generate hash
    3.Compare saved hash & new hash 
    */
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

//Create Person Model
const Person = mongoose.model("Person", personSchema);

//Exprt model
module.exports = Person;
