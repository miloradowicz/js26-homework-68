import { ChangeEventHandler, MouseEventHandler, PropsWithChildren } from 'react';
import { randomInt } from '../lib/utils';
import './TaskCard.css';

const ids: number[] = [];

interface TaskCardProps {
  completed: boolean;
  onStatusChange: ChangeEventHandler<HTMLInputElement>;
  onDelete: MouseEventHandler;
}

const TaskCard = ({ completed, onStatusChange, onDelete, children }: PropsWithChildren<TaskCardProps>) => {
  let id: number;
  do {
    id = randomInt(1000000);
  } while (ids.includes(id));

  return (
    <label htmlFor={`task-card-${id}`} className='task-item list-group-item d-flex align-items-center gap-1'>
      <input id={`task-card-${id}`} type='checkbox' checked={completed} onChange={onStatusChange} className='form-check-input' aria-label='Done' />
      <div className='task-text'>{children}</div>
      <button type='button' className='btn btn-danger ms-auto fa fa-solid fa-trash' onClick={onDelete} aria-label='Delete' />
    </label>
  );
};

export default TaskCard;
