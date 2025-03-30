import { createSlice } from '@reduxjs/toolkit';

type Todo = {
  id: string;
  userID: string;
  name: string;
  isCompleted: boolean;
};

type State = {
  todos: Todo[];
};

const initialState: State = {
  todos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      const { id, name, userID } = action.payload;
      const todo = { id, name, userID, isCompleted: false };
      state.todos.push(todo);
      const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
      localStorage.setItem('todos', JSON.stringify([...todos, todo]));
    },

    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
      localStorage.setItem(
        'todos',
        JSON.stringify(todos.filter((todo) => todo.id !== action.payload.id)),
      );
    },

    changeTodo(state, action) {
      const { id, newName } = action.payload;
      state.todos = state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, name: newName };
        }

        return todo;
      });

      const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
      localStorage.setItem(
        'todos',
        JSON.stringify(
          todos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, name: newName };
            }

            return todo;
          }),
        ),
      );
    },

    toggleIsCompleted(state, action) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });

      const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];

      localStorage.setItem(
        'todos',
        JSON.stringify(
          todos.map((todo) => {
            if (todo.id === action.payload.id) {
              return {
                ...todo,
                isCompleted: !todo.isCompleted,
              };
            }
            return todo;
          }),
        ),
      );
    },

    getTodos(state, action) {
      const { userID, query } = action.payload;
      const savedTodos = localStorage.getItem('todos');
      const parsedTodos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];

      let currentUserTodos = parsedTodos.filter((todo) => todo.userID === userID);

      if (query) {
        currentUserTodos = currentUserTodos.filter((todo) =>
          todo.name.trim().toLowerCase().includes(query.trim().toLowerCase()),
        );
      }

      state.todos = currentUserTodos;
    },

    clearTodos(state) {
      state.todos = [];
    },
  },
});

export default todosSlice.reducer;
export const { addTodo, deleteTodo, toggleIsCompleted, getTodos, clearTodos, changeTodo } =
  todosSlice.actions;
