import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { UserResponse } from '../../@types/user';
import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from '../../utils/user';

interface UserState {
  id: number | null
  username: string;
  token: string;
  isLogged: boolean;
  isLoading: boolean;
  errorMessage: string;
  loginCredentials: {
    email: string;
    password: string;
  };
  registerCredentials: {
    email: string
    password: string
    passwordConfirm: string
    username: string
  },
  editCredentials: {
    username: string
  }
}

const userData = getUserDataFromLocalStorage();

export const initialState: UserState = {
  id: null,
  username: '',
  token: '',
  // iLogged false by default, but if userdata in localStorage, set to true by default
  isLogged: Boolean(userData),
  isLoading: false,
  errorMessage: '',
  loginCredentials: {
    email: '',
    password: '',
  },
  registerCredentials: {
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
  },
  editCredentials: {
    username: '',
  },
  // If user data in the localStorage already exist, set it in the initial state
  ...userData,
};

export const checkTokenValidity = createAppAsyncThunk(
  'user/CHECK_TOKEN_VALIDITY',
  async () => {
    const { data: tokenIsValid } = await axiosInstance.post('/logged');

    return tokenIsValid as boolean;
  },
);

export const changeLoginCredentialsField = createAction<{
  value: string;
  // keyof credentials can be 'email' or 'password
  field: keyof UserState['loginCredentials'];
}>('user/CHANGE_LOGIN_CREDENTIALS_FIELD');

export const changeRegisterCredentialsField = createAction<{
  value: string;
  // keyof registerCredentials can be 'email' or 'password' or 'passwordConfirm' or 'username'
  field: keyof UserState['registerCredentials'];
}>('user/CHANGE_REGISTER_CREDENTIALS_FIELD');

export const changeEditCredentialsField = createAction<{
  value: string;
}>('user/CHANGE_EDIT_CREDENTIALS_FIELD');

export const resetEditForm = createAction('user/RESET_EDIT_CREDENTIALS');

export const login = createAppAsyncThunk(
  'user/LOGIN',
  async (_, thunkAPI) => {
    // get the state here
    const state = thunkAPI.getState();
    // Extract email and password from credentials
    const { email, password } = state.user.loginCredentials;
    // Send data to back
    const { data } = await axiosInstance.post('/login', {
      email,
      password,
    });

    // Transform data into json to save it into localStorage
    localStorage.setItem('user', JSON.stringify(data));

    return data as UserResponse;
  },
);
export const register = createAppAsyncThunk(
  'user/REGISTER',
  async (_, thunkAPI) => {
    // get the state here
    const state = thunkAPI.getState();
    // Extract email and password and username from registerCredentials
    const { email, password, username } = state.user.registerCredentials;
    // Send data to back
    const { data } = await axiosInstance.post('/register', {
      email,
      password,
      username,
    });
    return data as UserResponse;
  },
);

export const logout = createAction('user/LOGOUT');

export const deleteUser = createAppAsyncThunk(
  'user/DELETE_USER',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { id } = state.user;
    const { data } = await axiosInstance.delete(`/users/${id}`);
    return data;
  },
);
export const editUser = createAppAsyncThunk(
  'user/EDIT_USER',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { id } = state.user;
    const { username } = state.user.editCredentials;
    const { data } = await axiosInstance.put(`/users/${id}`, {
      username,
    });
    return data;
  },
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLoginCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      state.loginCredentials[field] = value;
    })
    .addCase(changeRegisterCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      state.registerCredentials[field] = value;
    })
    .addCase(changeEditCredentialsField, (state, action) => {
      state.editCredentials.username = action.payload.value;
    })
    .addCase(resetEditForm, (state) => {
      state.editCredentials = initialState.editCredentials;
    })
    .addCase(register.fulfilled, (state) => {
      state.registerCredentials = initialState.registerCredentials;
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loginCredentials = initialState.loginCredentials;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isLoading = false;
      state.isLogged = true;
    })
    .addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.errorMessage = 'Invalid login or password';
    })
    .addCase(logout, (state) => {
      state.isLogged = false;
      state.id = null;
      state.token = '';
      state.username = '';
      // When disconnected, remove user data from localStorage
      removeUserDataFromLocalStorage();
    })
    .addCase(deleteUser.fulfilled, (state) => {
      state.isLogged = false;
      state.id = null;
      state.token = '';
      state.username = '';
      removeUserDataFromLocalStorage();
    })
    .addCase(deleteUser.rejected, (state) => {
      state.errorMessage = 'Failed to delete user.';
    })
    .addCase(editUser.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.editCredentials.username = '';
      // line below sets the new username to the localstorage
      localStorage.setItem('user', JSON.stringify({ ...userData, username: action.payload.username }));
    })
    .addCase(checkTokenValidity.rejected, (state) => {
      state.isLogged = false;
      state.id = null;
      state.token = '';
      state.username = '';
      removeUserDataFromLocalStorage();
    });
});

export default userReducer;
