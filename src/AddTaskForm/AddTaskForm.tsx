import React, { ChangeEventHandler, FormEventHandler } from 'react';

interface AddTaskFormProps {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ placeholder, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className='input-group'>
        <input type='text' placeholder={placeholder} onChange={onChange} className='form-control' />
        <button type='submit' className='input-group-btn btn btn-success' style={{ width: '5em' }}>
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
