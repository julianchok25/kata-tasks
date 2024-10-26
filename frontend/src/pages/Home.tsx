import Create from "../components/Create"
import { useState, useEffect } from "react";
import '../assets/scss/Home.scss'
import axios from "axios";
import { TaskModel } from "../models/task.model";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import EditTask from "../components/Edit";

function Home() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [isUpdate, setIsUpdate] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [taskSelected, setTaskSelected] = useState<TaskModel>({} as TaskModel);

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

  const handleCompleted = (id: unknown) => {
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
  
  const handleEdit = (id: unknown) => {
    setIsEdit(true);
    setTaskSelected(tasks.find(task => task._id === id) as TaskModel);
  }

  const onUpdate = () => {
    setIsEdit(false);
    setIsUpdate(isUpdate + 1);
  }
  
  return (
    <section className="home">
      <h1 className="home__title">Task Management</h1>
      <Create onCreate={handleCreateTask}/>
      {isEdit && <EditTask task={taskSelected} onUpdate={onUpdate} />}
      <h2>Task List</h2>
      {
        tasks.length === 0 ? <p className="home__observation">No Records</p> :
        (
          tasks.map((task, index) => {
            return (
              <article className="task" key={index}>
                <div className="checkbox" onClick={() => handleCompleted(task._id)}>
                  {task.completed ?
                    <BsFillCheckCircleFill className="icons-container__icon checkbox__icon"/> : 
                    <BsCircleFill className="icons-container__icon checkbox__icon" />
                  }
                  <div className="desc-container">
                    <h2 className={task.completed ? "desc-container--line-through" :  ""}>{task.title}</h2>
                    <p className={task.completed ? "desc-container--line-through" :  ""}>{task.description}</p>
                  </div>
                </div>
                <div className="icons-container">
                  <BsPencilSquare className="icons-container__icon" onClick={() => handleEdit(task._id)}/>
                  <BsFillTrashFill className="icons-container__icon" onClick={() => handleDelete(task._id)}/>
                </div>
              </article>
            )
          })
        )
      }
    </section>
  )
}

export default Home