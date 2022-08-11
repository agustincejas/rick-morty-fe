import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserLoginResponse } from '../../app/models/user.interface';
import { RootState } from '../../app/store';
import authHeader from '../../app/token';
const axios = require('axios');

export interface AuthState {
  isLoggedIn: boolean;
  favorites: number[];
  email: string;
  userId: string;
  status: 'idle' | 'loading' | 'failed';
  token: string;
}



const getInitialValues = (): { favorites: number[], userId: string, email: string, token: string, isLoggedIn: boolean} => {
  const user = localStorage.getItem('user');
  if(user) {
    const parsedUser: UserLoginResponse = JSON.parse(user);
    const favoritesNumber = parsedUser.favorites.map(fav =>  Number(fav));
    return { favorites: favoritesNumber, userId: parsedUser.id, email: parsedUser.email, token: parsedUser.token, isLoggedIn: true };
  }
  return {favorites: [], userId: '', email: '', token: '', isLoggedIn: false};

}

const initialState: AuthState = {
  ...getInitialValues(),
  status: 'idle'
};

export interface AuthPayload {
  email: string;
  password: string;
}

export interface SaveFavoritesPayload {
  id: string;
  favorites: number[];
}


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const register = createAsyncThunk(
  'auth/register',
    async (payload: AuthPayload) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/`,  payload);
        // The value we return becomes the `fulfilled` action payload
        return response.data;

      } catch (error) {
        return error;
      }
    }
  );

export const login = createAsyncThunk(
  'auth/login',
  async (payload: AuthPayload) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, payload);
      const data = await response.data;
      return data;
    } catch (error) {
        return error;
      }
  }
);

export const setFavorites = createAsyncThunk(
  'auth/favorites',
  async (payload: SaveFavoritesPayload) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${payload.id}`, {favorites: payload.favorites },  { headers: authHeader() });
      const data = await response.data;
      return data;
    } catch (error) {
        return error;
      }
  }
)


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = 'idle';
      state.isLoggedIn = false;
      state.favorites = [];
      state.token = '';
      state.userId = '';
      state.email = '';
      localStorage.removeItem("user");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setFavorites.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isLoggedIn = true;
        state.favorites = action.payload.favorites;
        state.token = action.payload.token;
        state.userId = action.payload.id;
        state.email = action.payload.email;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(setFavorites.fulfilled, (state, action) => {
        state.status = 'idle';
        state.favorites = action.payload.favorites;
        const user = localStorage.getItem('user');
        const parsedUser: UserLoginResponse = JSON.parse(user!);
        parsedUser.favorites = action.payload.favorites;
        localStorage.setItem("user", JSON.stringify(parsedUser));
      })
      .addCase(register.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(setFavorites.rejected, (state, action) => {
        state.status = 'failed';
      })
  },
});


export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUserId = (state: RootState) => state.user.userId;
export const selectStatus = (state: RootState) => state.user.status;
export const selectToken = (state: RootState) => state.user.token;
export const selectFavorites = (state: RootState) => state.user.favorites;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
