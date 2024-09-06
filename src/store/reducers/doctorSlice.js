
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../App';
const initialState = {
  users: [],
  doctors:[],
  currentUser:"",
  loading:false
};

export const showDoctors=createAsyncThunk(
  "doctor/showDoctors",
  async({rejectWithValue})=>{
    console.log("heere")
    try {
      const response = await axiosInstance.get("doctors/list");
      console.log(response.data.Doctors);
      return response.data;
    }
    catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Internal Server Error");
      }
    }
  }
  );

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    // addUser: (state, action) => {
    //   const {email} = action.payload;
    //   const userExists = state.users.some(user => user.email === email);
    //   if (!userExists) {
    //     state.users = [...state.users,action.payload]
    //   }
    // },
    // updateUser: (state, action) => {
    //   const { email, updatedUser } = action.payload;
    //   state.users = state.users.map(user =>
    //     user.email === email ? { ...user, ...updatedUser } : user
    //   );
    // },
 
    // deleteUser: (state, action) => {

    //   const { email } = action.payload;
     
    //   state.users = state.users.filter(user => user.email !== email);
      
    // },
    // setCurrentUser:(state,action)=>{
    //   const { email } = action.payload;
    //   state.currentUser = state.users.find(user => user.email === email).name;
    // },
    
    
    },
    extraReducers: (builder) => {
      builder
      .addCase(showDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(showDoctors.fulfilled,(state,action)=>{
        state.loading=false;
        state.doctors=action.payload.Doctors;
      })
      .addCase(showDoctors.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
    }
  
});

export default doctorSlice.reducer;
export const { addUser,deleteUser,setCurrentUser,updateUser } = doctorSlice.actions;
