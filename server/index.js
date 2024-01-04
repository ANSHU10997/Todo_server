const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Connection = require("./database/db");
const app = express();

// Connect to MongoDB
Connection();

// Define Task schema and model
const taskSchema = new mongoose.Schema({
  task: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// GET route to fetch all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).send("Error fetching tasks from the database");
  }
});

// POST route to create a new task
app.post("/tasks", async (req, res) => {
  try {
    const { task, isCompleted } = req.body;
    const newTask = new Task({
      task,
      isCompleted,
    });
    await newTask.save();
    return res.status(201).json({
      newTask,
    });
  } catch (error) {
    res.status(500).send("Error posting task to the database");
  }
});

// PUT route to update a task by ID
app.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { task, isCompleted } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { task, isCompleted },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).send("Task not found");
    }

    return res.status(200).json({ updatedTask });
  } catch (error) {
    res.status(500).send("Error updating the task");
  }
});

// Delete route to delete a task by ID
app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const deltedTask = await Task.findByIdAndDelete(taskId);
    if (deltedTask) {
      return res.status(200).json({ deltedTask });
    }
  } catch (error) {
    res.status(500).send("Error in deleting the task");
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
