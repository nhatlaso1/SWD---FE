import { createSlice } from '@reduxjs/toolkit';
import __helpers from '@/helpers';

interface AuthState {
  isLogin: boolean;
  infoUser?: {
    id: number;
    email: string;
    name: string;
    phone: string;
    username: string;
    gender: number;
    dob: string;
    description: string;
    avatar: string;
    email_verified: number;
    role: string;
    vip_level: number | null;
    available_points: number | null;
    total_points_added: number | null;
    pricing_plan: number | null | undefined;
  };
}

const initialState: AuthState = {
  isLogin: false,
  infoUser: undefined
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      __helpers.cookie_delete('AT');
      window.location.href = '/login';
      state.isLogin = false;
    },

    setInfoUser(state, action) {
      state.infoUser = action.payload;
    }
  }
});

export const { login, logout, setInfoUser } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
