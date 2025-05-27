import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Todo } from '../types/types.ts'
import { TodosService } from '../services/todos.service.ts';

export interface TodosState {
  todos: Todo[]
}

const initialState: TodosState = {
  todos: [] as Todo[],
}

export const loadAllTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await TodosService.fetchTodos();
    return JSON.parse(response.data) as Todo[];
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (name: string) => {
    const now = new Date();
    const newTodo: Todo = {
      id: null,
      name,
      description: null,
      priority: null,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    await TodosService.createTodo(newTodo);
    return newTodo;
  }
);


export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAllTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      });
  },
})

// Action creators are generated for each case reducer function
/*export const {
  loadAllTodos,
  createTodo,
} = todosSlice.actions*/

export default todosSlice.reducer