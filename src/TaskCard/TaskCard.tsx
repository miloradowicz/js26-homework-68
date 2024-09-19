import { ChangeEventHandler, MouseEventHandler, PropsWithChildren } from 'react';
import './TaskCard.css';

interface TaskCardProps {
  completed: boolean;
  onStatusChange: ChangeEventHandler<HTMLInputElement>;
  onDelete: MouseEventHandler;
}

const TaskCard = ({ completed, onStatusChange, onDelete, children }: PropsWithChildren<TaskCardProps>) => {
  return (
    <div className='task-item list-group-item d-flex align-items-center gap-1'>
      <input type='checkbox' checked={completed} onChange={onStatusChange} className='form-check-input' aria-label='Done' />
      <div className='task-text'>{children}</div>
      <button type='button' className='btn btn-danger ms-auto fa fa-solid fa-trash' onClick={onDelete} aria-label='Delete' />
    </div>
  );
};

export default TaskCard;
