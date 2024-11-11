import axios from 'axios';

import { Identifiable, Task, TaskBody } from '@/types';
import { HttpError } from './errors/HttpError';

interface ApiId {
  get name(): string;
}

type ApiTaskBody = TaskBody;

type ApiTaskContainer = {
  [name: string]: ApiTaskBody;
};

const baseUrl =
  'https://js26-na-default-rtdb.europe-west1.firebasedatabase.app/hw-68/';

const getTasks = async (): Promise<Task[]> => {
  const endpoint = 'tasks.json';

  const { data, status, statusText } = await axios.get<ApiTaskContainer | null>(
    new URL(endpoint, baseUrl).href
  );

  if (status !== 200) {
    throw new HttpError(status, statusText);
  }

  return (
    (data &&
      Object.entries(data).map(([id, data]): Task => ({ ...data, id }))) ||
    []
  );
};

const addTask = async (task: TaskBody): Promise<Identifiable> => {
  const endpoint = 'tasks.json';

  const { data, status, statusText } = await axios.post<ApiId>(
    new URL(endpoint, baseUrl).href,
    task
  );

  if (status !== 200) {
    throw new HttpError(status, statusText);
  }

  return { ...task, id: data.name };
};

const getTask = async (id: string): Promise<Task | null> => {
  const endpoint = `tasks/${id}.json`;

  const { data, status, statusText } = await axios.get<ApiTaskBody | null>(
    new URL(endpoint, baseUrl).href
  );

  if (status !== 200) {
    throw new HttpError(status, statusText);
  }

  return (data && { ...data, id }) || null;
};

const updateTask = async (id: string, task: TaskBody): Promise<Task> => {
  const endpoint = `tasks/${id}.json`;

  const { data, status, statusText } = await axios.put<ApiTaskBody>(
    new URL(endpoint, baseUrl).href,
    task
  );

  if (status !== 200) {
    throw new HttpError(status, statusText);
  }

  return { ...data, id };
};

const deleteTask = async (id: string): Promise<void> => {
  const endpoint = `meals/${id}.json`;

  const { status, statusText } = await axios.delete(
    new URL(endpoint, baseUrl).href
  );

  if (status !== 200) {
    throw new HttpError(status, statusText);
  }
};

export default {
  getTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
};
