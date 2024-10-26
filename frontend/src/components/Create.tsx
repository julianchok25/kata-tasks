import '../assets/scss/Create.scss';
import { useState } from 'react';
import axios from 'axios';

function Create(props: {onCreate: () => void}) {
  const {onCreate} = props;

  const [title, setTitle] = useState<String>();
  const [description, setDescription] = useState<String>();

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
      onCreate();
    })
    .catch(error => {
      console.error(error);
    });

  }

  return (
    <article className="create-form">
      <input type="text" name='task-title' placeholder='Task title' onChange={(e) => setTitle(e.target.value)} />
      <input type="text" name='task-description' placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
      <button type='button' onClick={handleCreateTask}>Add</button>
    </article>
  )
}

export default Create
