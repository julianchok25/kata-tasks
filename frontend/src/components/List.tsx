import { TaskModel } from "../models/task.model"
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import '../assets/scss/List.scss';

function List(
    {tasks, onEditIcon, onUpdateValues}:
    {tasks: TaskModel[], onEditIcon: (id: unknown) => void, onUpdateValues: () => void}
) {

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
            onUpdateValues();
        })
        .catch(error => {
          console.error(error);
        });
    }
    
    const handleDelete = (id: unknown) => {
        axios.delete(`http://localhost:3000/tasks/${id}`)
        .then(() => {
            onUpdateValues();
        })
        .catch(error => {
          console.error(error);
        });
    }


  return (
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
              <BsPencilSquare className="icons-container__icon" onClick={() => onEditIcon(task._id)}/>
              <BsFillTrashFill className="icons-container__icon" onClick={() => handleDelete(task._id)}/>
            </div>
          </article>
        )
      })
  )
}

export default List