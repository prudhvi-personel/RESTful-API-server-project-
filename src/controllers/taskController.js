const Task = require('../models/task');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            user: req.user.id
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.remove();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};