const router = require("express").Router();
const { admin_model } = require("../../../models/AdminPanel/adminInfo");
const bcrypt = require("bcrypt");
const { validate } = require("../../../validations/loginValidation");
// const Joi = require("joi"); // library for data validation

module.exports = router.post("/", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { error } = validate(req.body);

    // to handle errors in input data
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // query to check if the user is authenticated
    const admin = await admin_model.findOne({ email: req.body.email });

    // if user is not authenticated, then generate an error message
    if (!admin || admin.isActiveUser == false) {
      return res.status(401).send({ message: "Admin not Registered!" });
    }

    // if user email is authenticated, then validate the password
    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    // if password is not correct, then generate an error message
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    // If email and password are valid, generate JWT token
    const token = admin.generateAuthToken();
    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
