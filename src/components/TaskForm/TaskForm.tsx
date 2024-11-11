import { TaskBody } from '@/types';

import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';

interface Props {
  placeholder: string;
  onSubmit: (task: TaskBody) => void;
}

interface FormData {
  text: string;
}

const TaskForm: React.FC<Props> = ({ placeholder, onSubmit }) => {
  const [data, setData] = useState<FormData>({ text: '' });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    onSubmit({ ...data, completed: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='input-group'>
        <input
          name='text'
          type='text'
          placeholder={placeholder}
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
  );
};

export default TaskForm;
