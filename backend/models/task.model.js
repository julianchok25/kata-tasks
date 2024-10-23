import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: false,
        default: false,
    },
}, {
    timestamps: true, // createdAt, updatedAt
});

const Task = mongoose.model('Task', taskSchema);

export default Task;