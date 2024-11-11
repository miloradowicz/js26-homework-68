import { Task, TaskBody } from '@/types';
import Api from '@/lib/api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface TodoState {
  tasks: Task[];
  loading: boolean;
  error: boolean;
}

const initialState: TodoState = {
  tasks: [],
  loading: false,
  error: false,
};

export const getTasks = createAsyncThunk<Task[], void>('todo/get', async () => {
  return await Api.getTasks();
});

export const addTask = createAsyncThunk<void, TaskBody>(
  'todo/add',
  async (task) => {
    void (await Api.addTask(task));
  }
);

export const updateTask = createAsyncThunk<
  void,
  { id: string; task: TaskBody }
>('todo/update', async ({ id, task }) => {
  void (await Api.updateTask(id, task));
});

export const deleteTask = createAsyncThunk<void, string>(
  'todo/delete',
  async (id) => {
    void (await Api.deleteTask(id));
  }
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.tasks = action.payload;
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(addTask.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(addTask.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(addTask.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(deleteTask.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const todoReducer = todoSlice.reducer;
