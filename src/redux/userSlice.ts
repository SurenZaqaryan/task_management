import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  const currentUser = sessionStorage.getItem('currentUser');

  const parsedCurrentUser = currentUser ? JSON.parse(currentUser) : null;

  if (parsedCurrentUser) {
    return {
      user: parsedCurrentUser,
      isAuthenticated: true,
      error: '',
    };
  } else {
    return null;
  }
};

const initialState = loadState() || {
  user: null,
  isAuthenticated: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // signup
    signup(state, action) {
      const { payload: user } = action;
      const { name, email, id } = user;

      // signup
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]') as User[];

      // @ts-ignore
      if (users.find((user) => user.email === email)) {
        state.error = 'A user with this email is already registered.';
        return;
      }

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      // login

      state.user = { name, email, id };
      state.isAuthenticated = true;
      state.error = '';
      sessionStorage.setItem('currentUser', JSON.stringify({ name, email, id }));
    },

    // login
    login(state, action) {
      const { email, password } = action.payload;
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]') as User[];

      const user = users.find((user) => user.email === email);

      if (!user) {
        state.error = 'User with this email was not found.';
        return;
      }

      if (user.password !== password) {
        state.error = 'Incorrect password!';
        return;
      }

      state.user = user;
      state.error = '';
      state.isAuthenticated = true;
      sessionStorage.setItem(
        'currentUser',
        JSON.stringify({ name: user.name, id: user.id, email: user.email }),
      );
    },

    // logout
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = '';
      sessionStorage.removeItem('currentUser');
    },

    // remove errors
    removeErrors(state) {
      state.error = '';
    },
  },
});

type User = {
  name: string;
  email: string;
  password: string;
  id: string;
};

export default userSlice.reducer;
export const { signup, logout, login, removeErrors } = userSlice.actions;
