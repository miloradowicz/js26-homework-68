import { MouseEventHandler, PropsWithChildren } from 'react';

interface TaskCardProps {
  onDelete: MouseEventHandler;
}

const TaskCard = ({ onDelete, children }: PropsWithChildren<TaskCardProps>) => {
  return (
    <div className='list-group-item d-flex'>
      <div>{children}</div>
      <button type='button' className='btn btn-danger ms-auto fa fa-solid fa-trash' onClick={onDelete}></button>
    </div>
  );
};

export default TaskCard;
