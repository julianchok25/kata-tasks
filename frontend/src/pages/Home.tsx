import Create from "../components/Create"
import { useState, useEffect } from "react";
import '../assets/scss/Home.scss'
import axios from "axios";
import { TaskModel } from "../models/task.model";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";

function Home() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [isUpdate, setIsUpdate] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:3000/tasks')
    .then(({data}) => {
      console.log(data.tasks);
      setTasks(data.tasks);
    })
    .catch(error => {
      console.error(error);
    });
  }, [isUpdate])

  const handleCreateTask = () => setIsUpdate(isUpdate + 1);

  const handleEdit = (id: unknown) => {
    axios.put(`http://localhost:3000/tasks/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        completed: true
      }
    })
    .then(() => {
      setIsUpdate(isUpdate + 1);
    })
    .catch(error => {
      console.error(error);
    });
  } 

  const handleDelete = (id: unknown) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
    .then(() => {
      setIsUpdate(isUpdate + 1);
    })
    .catch(error => {
      console.error(error);
    });
  } 
  
  return (
    <section className="home">
      <h1 className="home__title">Create a new task</h1>
      <Create onCreate={handleCreateTask}/>
      {
        tasks.length === 0 ? <p className="home__observation">No Records</p> :
        (
          tasks.map((task, index) => {
            return (
              <article className="task" key={index}>
                <div className="checkbox" onClick={() => handleEdit(task._id)}>
                  {task.completed ?
                    <BsFillCheckCircleFill className="task__icon checkbox__icon"/> : 
                    <BsCircleFill className="task__icon checkbox__icon" />
                  }
                  <div className="desc-container">
                    <h2 className={task.completed ? "desc-container--line-through" :  ""}>{task.title}</h2>
                    <p className={task.completed ? "desc-container--line-through" :  ""}>{task.description}</p>
                  </div>
                </div>
                <BsFillTrashFill className="task__icon" onClick={() => handleDelete(task._id)}/>
              </article>
            )
          })
        )
      }
    </section>
  )
}

export default Home