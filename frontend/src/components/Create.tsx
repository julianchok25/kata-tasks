import '../assets/scss/Create.scss';
import { useState } from 'react';
import axios from 'axios';

function Create(props: {onCreate: () => void}) {
  const {onCreate} = props;

  const [title, setTitle] = useState<String | any>('');
  const [description, setDescription] = useState<String | any>('');

  const handleCreateTask = () => {
    axios.post('http://localhost:3000/tasks', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        title,
        description
      }
    })
    .then(() => {
      setTitle('');
      setDescription('');
      onCreate();
    })
    .catch(error => {
      console.error(error);
    });

  }

  return (
    <article className="create-form">
      <h2 className="create-form__title">Create a new task</h2>
      <input type="text" name='task-title' value={title} placeholder='Task title' onChange={(e) => setTitle(e.target.value)} />
      <input type="text" name='task-description' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
      <button type='button' onClick={handleCreateTask}>Add</button>
    </article>
  )
}

export default Create
