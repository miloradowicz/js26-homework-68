import { AppDispatch, RootState } from '@/app/store';
import TaskForm from '@/components/TaskForm/TaskForm';
import TaskList from '@/components/TaskList/TaskList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from './todoSlice';
import Loader from '@/components/Loader/Loader';

const Todo = () => {
  const tasks = useSelector((state: RootState) => state.todo.tasks);
  const loading = useSelector((state: RootState) => state.todo.loading);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <>
      <div className='container'>
        <h1>Task planner</h1>
        <div className='my-2'>
          <TaskForm />
        </div>
        <div className='d-flex flex-column gap-2 my-2'>
          <div className='card'>
            <h3 className='card-header'>Ongoing</h3>
            <TaskList tasks={tasks.filter((x) => !x.completed)} />
          </div>
        </div>
        <div className='d-flex flex-column gap-2 my-2'>
          <div className='card'>
            <h3 className='card-header'>Completed</h3>
            <TaskList tasks={tasks.filter((x) => x.completed)} />
          </div>
        </div>
      </div>
      {!loading ? null : <Loader />}
    </>
  );
};

export default Todo;
