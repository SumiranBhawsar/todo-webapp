/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { title } from "process";

export interface todo {
  id?: string;
  title: string;
  content: string;
  isDone?: boolean;
}

interface todoState {
  todos: todo[];
}

const initialState: todoState = {
  todos: [
    {
      id: "1",
      title: "Introducation",
      content: "I am Sumiran Bhawsar",
      isDone: true,
    },
  ],
};

// const todoSlice = createSlice({
//   name: "todo",
//   initialState,
//   reducers: {
//     addTodo: (state, action: PayloadAction<todo>) => {
//       const newTodo = {
//         id: nanoid(),
//         title: action.payload.title,
//         content: action.payload.content,
//         isDone: false,
//       }
//       state.todos.push(newTodo);
//     },

//     removeTodo: (state, action: PayloadAction<todo>) => {
//         state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
//     }
// })

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<todo>) => {
      if (!action.payload.title || !action.payload.content) {
        return;
      }

      const newTodo = {
        id: nanoid(),
        title: action.payload.title,
        content: action.payload.content,
        isDone: false,
      };
      state.todos.push(newTodo);
    },

    removeTodo: (state, action: PayloadAction<todo>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },

    updateTodo: (state, action: PayloadAction<todo>) => {
      const { id, title, content, isDone } = action.payload;
      const todoToUpdate = state.todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        if (title !== undefined) todoToUpdate.title = title;
        if (content !== undefined) todoToUpdate.content = content;
        if (isDone !== undefined) todoToUpdate.isDone = isDone;
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
