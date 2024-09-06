
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser:"",
};
export const validateUser = createAsyncThunk(
  'user/validateUser',
  async ({ email, password }, { getState }) => {
    const { users } = getState().user;
    return users.some(user => user.email === email && user.password === password);
  }
);
export const userExists = createAsyncThunk(
  'user/userExists',
  async ({ email }, { getState }) => {
    const { users } = getState().user;
    return users.some(user => user.email === email);
    
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {email} = action.payload;
      const userExists = state.users.some(user => user.email === email);
      if (!userExists) {
        state.users = [...state.users,action.payload]
      }
    },
    updateUser: (state, action) => {
      const { email, updatedUser } = action.payload;
      state.users = state.users.map(user =>
        user.email === email ? { ...user, ...updatedUser } : user
      );
    },
 
    deleteUser: (state, action) => {

      const { email } = action.payload;
     
      state.users = state.users.filter(user => user.email !== email);
      
    },
    setCurrentUser:(state,action)=>{
      const { email } = action.payload;
      state.currentUser = state.users.find(user => user.email === email).name;
    },
    
    
    },
  
});

export default userSlice.reducer;
export const { addUser,deleteUser,setCurrentUser,updateUser } = userSlice.actions;
