const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/user/create", async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/user/getList", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/user/getById/:id", async (req, res) => {
  const _İd = req.params.id;
  try {
    const user = await User.findById(_İd);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/user/delete/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/user/update/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "email", "password", "age"];
  const isValidUpdate = updates.every(update => allowUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid Operation" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
