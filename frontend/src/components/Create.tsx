import '../assets/scss/Create.scss';
import { useState } from 'react';
import axios from 'axios';

function Create(props: {onCreate: () => void}) {
  const {onCreate} = props;

  const [title, setTitle] = useState<String | any>('');
  const [description, setDescription] = useState<String | any>('');
  const [error, setError] = useState({titleError: '', descriptionError: ''});

  const handleTitleChange = (e: any) => {
    const {value} = e.target;
    setTitle(value);

    // Validate if the input is not empty
    setError({titleError: !value.trim() ? 'Title is required.' : '', descriptionError: ''});
  };

  const handleDescChange = (e: any) => {
    const {value} = e.target;
    setDescription(value);

    setError({titleError: '', descriptionError: !value.trim() ? 'Description is required.' : ''});
  };

  const handleCreateTask = () => {
    console.log('Creating task...');
    
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

      <label htmlFor="task-title">Task Title <span>*</span></label>
      <input className={error.titleError ? 'border-error': ''} type="text" name='task-title' value={title} placeholder='Task title' onChange={(e) => handleTitleChange(e)} />
      {error.titleError && <span className='create-form--error'>{error.titleError}</span>}

      <label htmlFor="task-title">Description <span>*</span></label>
      <input  className={error.descriptionError ? 'border-error': ''} type="text" name='task-description' value={description} placeholder='Description' onChange={(e) => handleDescChange(e)} />
      {error.descriptionError && <span className='create-form--error'>{error.descriptionError}</span>}
  
      <button disabled={(!!error.titleError || !title) || (!!error.descriptionError || !description)} type='button' onClick={handleCreateTask}>Add</button>
    </article>
  )
}

export default Create
