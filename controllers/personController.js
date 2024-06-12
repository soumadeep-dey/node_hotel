//Import DB model
const Person = require("../models/Person");
const generateToken = require("../middleware/jwt");

const personController = {
  signup: async (req, res) => {
    try {
      const data = req.body; //from bodyParser

      //Create Person document using Mongoose model & directly pass the data to the model
      const newPerson = new Person(data);

      //Save the new Person to the database
      const response = await newPerson.save();
      console.log("data saved");

      // Generate JWT token
      const payload = {
        id: response.id,
        username: response.username,
      };
      const token = generateToken(payload);
      console.log("Token is:", token);

      res.status(200).json({ response, token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  login: async (req, res) => {
    try {
      // extract username, password from req.body
      const { username, password } = req.body;
      const user = await Person.findOne({ username: username });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      //  generate token
      const payload = {
        id: user.id,
        username: user.username,
      };
      const token = generateToken(payload);

      res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  profile: async (req, res) => {
    try {
      const userPayload = req.userPayload;
      // console.log("User Payload:", userPayload);
      const userId = userPayload.id;
      const user = await Person.findById(userId);

      res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getAllPerson: async (req, res) => {
    try {
      const data = await Person.find();
      console.log("data fetched");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getPersonByWork: async (req, res) => {
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
  },
  putPerson: async (req, res) => {
    try {
      const personId = req.params.id;
      const updatedPersonData = req.body;

      // Check if the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        console.log("Invalid student ID:", studentId);
        return res.status(400).send({ error: "Invalid student ID" });
      }

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
  },
  deletePerson: async (req, res) => {
    try {
      const personId = req.params.id;

      // Check if the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        console.log("Invalid student ID:", studentId);
        return res.status(400).send({ error: "Invalid student ID" });
      }

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
  },
};

module.exports = personController;
