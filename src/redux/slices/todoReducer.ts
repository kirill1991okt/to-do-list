import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface IData {
  id: string;
  item: string;
  completed: boolean;
}

export const addTodosReducer = createSlice({
  name: 'todo',
  initialState: [] as IData[],
  reducers: {
    addTodos: (state, action: PayloadAction<IData>) => {
      state.push(action.payload);
    },
    removeTodos: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateTodos: (
      state,
      action: PayloadAction<{ id: string; item: string }>
    ) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            item: action.payload.item,
          };
        }
        return todo;
      });
    },
    completedTodos: (state, action: PayloadAction<string>) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    },
  },
});

export const { addTodos, removeTodos, updateTodos, completedTodos } =
  addTodosReducer.actions;

export const selectState = (state: RootState) => state.todo;

export default addTodosReducer.reducer;
