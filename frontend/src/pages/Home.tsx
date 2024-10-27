import Create from "../components/Create"
import { useState, useEffect } from "react";
import '../assets/scss/Home.scss'
import axios from "axios";
import { TaskModel } from "../models/task.model";
import EditTask from "../components/Edit";
import List from "../components/List";

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
      <h1 className="home__title">Task Management App</h1>
      <Create onCreate={handleCreateTask}/>
      {isEdit && <EditTask task={taskSelected} onUpdate={onUpdate} />}
      {
        tasks.length === 0 ? <p className="home__observation">No Records 😕</p> :
        <div className="task-list">
          <h2>Task List</h2>
          <List tasks={tasks} onEditIcon={handleEdit} onUpdateValues={onUpdate} />
        </div>
      }
    </section>
  )
}

export default Home