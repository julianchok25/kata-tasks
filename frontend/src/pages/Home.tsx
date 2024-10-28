import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TaskModel } from "../models/task.model";
import { API_PATH } from "../utils/servicesPaths";
import { getCommonHeaders } from "../utils/helpers";

import EditTask from "../components/Edit";
import Create from "../components/Create"
import List from "../components/List";
import '../assets/scss/Home.scss'

function Home() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [isUpdate, setIsUpdate] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [taskSelected, setTaskSelected] = useState<TaskModel>({} as TaskModel);

  useEffect(() => {
    axios.get(API_PATH.taskEndpoint,
      {
        headers: getCommonHeaders()
      })
      .then(({ data }) => {
        console.log(data.tasks);
        setTasks(data.tasks);
      })
      .catch(error => {
        console.error(error);

        if (error.response.status === 401) {
          onClearSession();
        }
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

  const onClearSession = () => {
    sessionStorage.clear();
    location.reload();
  }

  return (
    <section className="home">
      <header className="header">
        <Link className="header__link" to={'/'} onClick={onClearSession}>Logout</Link>
      </header>

      <h1 className="home__title">Task Management App</h1>

      <Create onCreate={handleCreateTask} onClearSession={onClearSession} />

      {isEdit && <EditTask task={taskSelected} onUpdate={onUpdate} onClearSession={onClearSession} />}
      {
        tasks.length === 0 ? <p className="home__observation">No Records 😕</p> :
          <div className="task-list">
            <h2>Task List</h2>
            <List tasks={tasks} onEditIcon={handleEdit} onUpdateValues={onUpdate} onClearSession={onClearSession} />
          </div>
      }
    </section>
  )
}

export default Home