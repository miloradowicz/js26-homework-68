import React from 'react';

interface AddTaskFormProps {
  placeholder: string;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ placeholder }) => {
  return (
    <form>
      <input type='text' id='' placeholder={placeholder} />
    </form>
  );
};

export default AddTaskForm;
