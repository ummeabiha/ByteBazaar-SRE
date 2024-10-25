const router = require("express").Router();
const { user_model } = require("../../../models/UserPanel/userInfo");
const bcrypt = require("bcrypt");
const { validate } = require("../../../validations/resetPasswordValidation");

module.exports = router.post("/", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { error } = validate(req.body);

    if (error) {
      console.log("Received error in data");
      return res.status(400).send({ message: error.details[0].message });
    }

    // Find the user by email
    const user = await user_model.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the password & confirm password are the same
    if (req.body.password !== req.body.confirmPassword) {
      console.log("Passwords do not match");
      return res.status(400).send({ message: "Passwords do not match." });
    }

    // Hash the new password before saving it
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
  }
});
