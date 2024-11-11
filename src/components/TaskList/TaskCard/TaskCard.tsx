import { ChangeEventHandler, FC, MouseEventHandler } from 'react';
import './TaskCard.css';
import { deleteTask, getTasks, updateTask } from '@/containers/Todo/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { showModal } from '@/components/Modal/modalSlice';

interface Props {
  id: string;
}

const TaskCard: FC<Props> = ({ id }) => {
  const text = useSelector(
    (state: RootState) => state.todo.tasks.find((x) => x.id === id)?.text
  );
  const completed = useSelector(
    (state: RootState) => state.todo.tasks.find((x) => x.id === id)?.completed
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (text !== undefined && e.target.checked !== undefined) {
      await dispatch(
        updateTask({ id, task: { text, completed: e.target.checked } })
      );
      await dispatch(getTasks());
    }
  };

  const handleDelete: MouseEventHandler = async () => {
    dispatch(
      showModal({
        title: 'Delete task',
        body: 'Are you sure you want to delete the task?',
        onConfirm: actuallyDelete,
      })
    );
  };

  const actuallyDelete = async () => {
    await dispatch(deleteTask(id));
    await dispatch(getTasks());
  };

  return (
    <label
      htmlFor={`task-card-${id}`}
      className='task-item list-group-item d-flex align-items-center gap-1'
    >
      <input
        id={`task-card-${id}`}
        type='checkbox'
        checked={completed}
        onChange={handleChange}
        className='form-check-input'
        aria-label='Done'
      />
      <div className='task-text'>{text}</div>
      <button
        type='button'
        className='btn btn-danger ms-auto fa fa-solid fa-trash'
        onClick={handleDelete}
        aria-label='Delete'
      />
    </label>
  );
};

export default TaskCard;
