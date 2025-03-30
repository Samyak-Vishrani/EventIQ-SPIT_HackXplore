import React, { useEffect, useState } from 'react';
import { Loader, AlertCircle } from 'lucide-react';
import '../styles/taskList.css';
import url from "../apis/urls";
import Cookies from "js-cookie";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false); // abhi ke liye false hai
  const [error, setError] = useState(null);
  const [fetchDate, setFetchDate] = useState('');

  useEffect(() => {
    const fetchTasks = () => {
      try {

        fetch(`${url}/committee/joiningCode/${Cookies.get("joining-code")}/departments`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data.departments);
            const allTasks = data.departments.flatMap(department => department.tasks);
            setTasks(allTasks);
          })

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  console.log(tasks);

  // const toggleTaskCompletion = (id) => {
  //   setTasks(tasks.map(task => 
  //     task.id === id ? { ...task, completed: !task.completed } : task
  //   ));
  // };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="task-container">
      <div className="task-wrapper">
        <h2 className="task-title">Task List</h2>

        {loading ? (
          <div className="task-loading">
            <Loader className="spinner" />
            Fetching tasks...
          </div>
        ) : error ? (
          <div className="task-error">
            <AlertCircle className="error-icon" />
            {error}
          </div>
        ) : tasks.length === 0 ? (
          <div className="task-empty">No tasks available</div>
        ) : (
          <ul className="task-list">
            {tasks.map(task => (
              task != "" &&
              <li key={task.id} className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                  className="task-checkbox"
                />
                <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                  {task}
                </span>
                <span className="task-department">{task.department}</span>
                <span className="task-date">{task.dateFetched}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
