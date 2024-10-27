import mongoose from 'mongoose';
import Task from '../models/task.model.js';

export const getTasks = async (_, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200)
        .json({ success: true, tasks });
    } catch (error) {
        res.status(500)
        .json({ success: false, message: `Server Error on Fetch: ${error.message}` });
    }
}

export const createTask = async (req, res) => {  
    const task = req.body.data;

    if (!task.title && !task.description) {
        console.error('Task title and description are required.');
        return res.status(400)
        .json({ success: false, message: 'Task title and description are required.' });
    }

    const newTask = new Task({
        title: task.title,
        description: task.description,
        completed: task?.completed || false,
    });

    try {
        await newTask.save();
        res.status(201)
        .json({success: true, data: newTask, data: newTask});
    } catch (error) {
        res.status(500)
        .json({ success: false, message: `Server Error on Save: ${error.message}` });
    }
}

export const updateTask = async (req, res) => {
    const {id} = req.params;
    const task = req.body.data;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404)
        .json({ success: false, message: 'Invalid Task ID NOT FOUND' });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true });
        res.status(200)
        .json({ success: true, data: updatedTask });
    } catch (error) {
        res.status(500)
        .json({ success: false, message: `Server Error on Update: ${error.message}` });
    }
}

export const deleteTask = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404)
        .json({ success: false, message: 'Invalid Task ID NOT FOUND' });
    }
    
    try {
        await Task.findByIdAndDelete(id);
        res.status(200)
        .json({ success: true, message: `Task ${id} Deleted Successfully` });
    } catch (error) {
        res.status(500)
        .json({ success: false, message: `Server Error on Delete: ${error.message}` });
    }
}