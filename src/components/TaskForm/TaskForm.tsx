import { AppDispatch } from '@/app/store';
import { addTask, getTasks } from '@/containers/Todo/todoSlice';

import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../Modal/modalSlice';

interface FormData {
  text: string;
}

const TaskForm = () => {
  const [data, setData] = useState<FormData>({ text: '' });

  const dispatch = useDispatch<AppDispatch>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (data.text) {
      await dispatch(addTask({ ...data, completed: false }));
      await dispatch(getTasks());
      setData({ text: '' });
    } else {
      dispatch(
        showModal({
          title: 'Enter the task name',
          body: 'Task name cannot be empty.',
        })
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <input
            name='text'
            type='text'
            placeholder='Add task'
            onChange={handleChange}
            className='form-control'
            value={data.text}
          />
          <button
            type='submit'
            className='input-group-btn btn btn-success'
            style={{ width: '5em' }}
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
