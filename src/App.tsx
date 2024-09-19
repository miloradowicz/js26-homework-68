import { useState, ChangeEvent, FormEvent } from 'react';
import Task from './lib/Task';
import AddTaskForm from './AddTaskForm/AddTaskForm';
import TaskCard from './TaskCard/TaskCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const initialTasks = ['Learn HTML', 'Learn CSS', 'Learn JS', 'Learn Typescript', 'Learn React', '???', 'Profit'];

const App = () => {
  const [tasks, setTasks] = useState(initialTasks.map((x, i) => new Task(i, x)));
  const [currentId, setCurrentId] = useState(Math.max(...tasks.map((x) => x.id)) + 1);
  const [currentTask, setCurrentTask] = useState('');

  const addTask = (text: string) => {
    try {
      const newTask = new Task(currentId, text);

      setTasks([...tasks, newTask]);
      setCurrentId(currentId + 1);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        console.error(err);
      }
    }
  };

  const removeTask = (id: number) => {
    try {
      setTasks(tasks.filter((x) => x.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        console.error(err);
      }
    }
  };

  const setTaskStatus = (id: number, completed: boolean) => {
    try {
      const i = tasks.findIndex((x) => x.id === id);

      if (i < 0) {
        return;
      }

      const tasksCopy = [...tasks];
      tasksCopy.splice(i, 1, new Task(tasks[i].id, tasks[i].text, completed));

      setTasks(tasksCopy);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    }
  };

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTask(e.target.value);
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTask(currentTask);
  };

  const changeStatus = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const status = tasks.find((x) => x.id === id)?.completed;

    if (status !== undefined) {
      setTaskStatus(id, !status);
    }
  };

  return (
    <div className='container'>
      <h1>Task planner</h1>
      <div className='my-2'>
        <AddTaskForm placeholder='Add task' onChange={changeInput} onSubmit={submitForm} />
      </div>
      <div className='d-flex flex-column gap-2'>
        <div className='card'>
          <h3 className='card-header'>Ongoing</h3>
          <ul className='list-group list-group-flush'>
            {tasks
              .filter((x) => x.completed === false)
              .map((x) => (
                <TaskCard
                  key={x.id}
                  completed={x.completed}
                  onStatusChange={(e: ChangeEvent<HTMLInputElement>) => changeStatus(e, x.id)}
                  onDelete={() => removeTask(x.id)}
                >
                  {x.text}
                </TaskCard>
              ))}
          </ul>
        </div>
        <div className='card'>
          <h3 className='card-header'>Completed</h3>
          <ul className='list-group list-group-flush'>
            {tasks
              .filter((x) => x.completed === true)
              .map((x) => (
                <TaskCard
                  key={x.id}
                  completed={x.completed}
                  onStatusChange={(e: ChangeEvent<HTMLInputElement>) => changeStatus(e, x.id)}
                  onDelete={() => removeTask(x.id)}
                >
                  {x.text}
                </TaskCard>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
