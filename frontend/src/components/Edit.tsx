import { useState, useEffect } from 'react';
import axios from 'axios';
import { TaskModel } from '../models/task.model';
import '../assets/scss/Edit.scss';

function EditTask({task, onUpdate}: {task: TaskModel, onUpdate: () => void}) {
    const [title, setTitle] = useState<String | any>('');
    const [description, setDescription] = useState<String | any>('');

    useEffect(() => {    
        setTitle(task.title);
        setDescription(task.description);
    }, [task.title, task.description]);

    const handleUpdateTask = () => {
        axios.put(`http://localhost:3000/tasks/${task._id}`, {
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
                title: title || task.title,
                description: description || task.description
            }
        })
        .then(() => {
            onUpdate();
        })
        .catch(error => {
            console.error(error);
        });
    }

        return (
            <article className='edit-form'>
                <h2 className='edit-form__title'>Edit the Task "{task.title}"</h2>
                <input type="text" name='task-title' value={title} placeholder='Task title' onChange={(e) => setTitle(e.target.value)} />
                <input type="text" name='task-description' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                <button type='button' onClick={handleUpdateTask}>Update</button>
            </article>
        )
}

export default EditTask