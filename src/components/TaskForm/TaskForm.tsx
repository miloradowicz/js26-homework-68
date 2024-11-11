import { AppDispatch } from '@/app/store';
import { addTask, getTasks } from '@/containers/Todo/todoSlice';
import Modal from '@/components/Modal/Modal';

import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';

interface FormData {
  text: string;
}

const TaskForm = () => {
  const [data, setData] = useState<FormData>({ text: '' });
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (data.text) {
      await dispatch(addTask({ ...data, completed: false }));
      await dispatch(getTasks());
    } else {
      setShowModal(true);
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
      {!showModal ? null : (
        <Modal
          title='Enter the task name'
          onClose={() => {
            setShowModal(false);
          }}
        >
          Task name cannot be empty.
        </Modal>
      )}
    </>
  );
};

export default TaskForm;
