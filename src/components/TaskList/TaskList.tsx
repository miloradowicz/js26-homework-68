import { Task } from '@/types';

import { FC } from 'react';
import TaskCard from './TaskCard/TaskCard';

interface Props {
  tasks: Task[];
}

const TaskList: FC<Props> = ({ tasks }) => {
  return (
    <ul className='list-group list-group-flush'>
      {!tasks.length ? (
        <span className='task-item list-group-item'>No tasks yet</span>
      ) : (
        tasks.map((x) => <TaskCard key={x.id} id={x.id} />)
      )}
    </ul>
  );
};

export default TaskList;
