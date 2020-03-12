const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/task/create", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/task/getList", auth, async (req, res) => {
  try {
    //const tasks = await Task.find({ owner: req.user._id, path: 'tasks', match: {completed:false} });
    const match = {};
    const sort = {}
    
    if (req.query.completed) {
      match.completed = req.query.completed === true;
    }

    if(req.query.sortBy){
      const parts = req.query.sortBy.split(':')
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    await req.user
      .populate({
        path: "tasks",
        match: { completed: true },
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/task/getById/:id", auth, async (req, res) => {
  const _id = new Task(req.params.id);

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/task/delete/:id", auth, async (req, res) => {
  try {
    //const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/task/update/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "It is not valid operation" });
  }

  try {
    //const task = await Task.findById(req.params.id);
    const task = await Task.findOne({
      _id: req.params._id,
      owner: req.user._id
    });
    updates.forEach(update => (task[update] = req.body[update]));
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
