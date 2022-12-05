const express = require("express");
const router = express.Router();
const Admin = require("../models/adminSchema");
const Item = require("../models/itemSchema");

router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly" });
  }
  try {
    const userExistByEmail = await Admin.findOne({ email: email });
    const userExistByPhone = await Admin.findOne({ phone: phone });
    if (userExistByEmail) {
      return res.status(422).json({ error: "Email already in use" });
    } else if (userExistByPhone) {
      return res.status(422).json({ error: "Phone number already in use" });
    } else {
      const user = new Admin({ name, email, phone, password });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
      console.log(user);
    }
  } catch (error) {
    res.status(422).json({ error: "Something went wrong" });
  }
});

router.get("/login", async (req, res) => {
  const { email, password } = req.query;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly" });
  }
  try {
    const userLogin = await Admin.findOne({ email: email, password: password });
    console.log(userLogin);
    if (userLogin) {
      res
        .status(201)
        .json({ message: "User logged in successfully", userInfo: userLogin });
      console.log(userLogin);
    } else {
      return res
        .status(422)
        .json({ error: "Invalid credentials, please try again" });
    }
  } catch (error) {
    res.status(422).json({ error: "Something went wrong" });
  }
});

module.exports = router;
