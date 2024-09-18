import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
  posts: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
     state.users = action.payload.users || [];
      state.posts = action.payload.posts || [];
      state.isAuthenticated = true;

     localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('loginUser', JSON.stringify(action.payload));
    },
    logoutUser(state) {
      state.users = [];
      state.posts = [];
      
      state.isAuthenticated = false;

    
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('loginUser');
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
