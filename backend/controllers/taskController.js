const Task = require("../models/Task");
const createTask = async (req, res) => {
    const { title, description, status, dueDate } = req.body;
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Title is required"
        });
    }

    const task = new Task({
        title,
        description,
        status,
        dueDate,

        user: req.user.id
    });
    await task.save();
    res.status(201).json({
        success: true,
        task
    });
};

const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    });

    res.status(200).json({
        success: true,
        count: tasks.length,
        tasks
    });
};

const getTask = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findOne({
        _id: id,
        user: req.user.id
    });

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    res.status(200).json({
        success: true,
        task
    });
};

const updateTask = async (req, res) => {

    // Get task ID from URL
    const { id } = req.params;

    // Find the task belonging to the logged-in user
    const task = await Task.findOne({
        _id: id,
        user: req.user.id
    });

    // Task not found
    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    // Get updated fields from request body
    const { title, description, status, dueDate } = req.body;

    // Update only the fields provided
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;

    // Save updated task
    await task.save();

    // Return updated task
    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        task
    });
};

const deleteTask = async (req, res) => {

    const { id } = req.params;

    const task = await Task.findOne({
        _id: id,
        user: req.user.id
    });

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task deleted successfully"
    });

};

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
};

