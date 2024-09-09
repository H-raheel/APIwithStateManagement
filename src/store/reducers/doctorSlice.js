
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
  async(data,{rejectWithValue})=>{
    console.log("heere")
    try {
      const response = await axiosInstance.get("/doctors/list",data,
        { headers: {
        'Content-Type': 'application/json', 
      
      },});
      console.log(response.data);
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
  export const addDoctor=createAsyncThunk(
    "doctor/addDoctor",
    async(data,{rejectWithValue})=>{
    
      try {
        const response = await axiosInstance.post("/doctors/create",
          data, { headers: {
            'Content-Type': 'application/json', 
          
          },});
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
    reducers:{
      nullError: (state) => {
        
        state.error = null;
      },
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
      .addCase(addDoctor.pending,(state)=>{
        state.error=null;
        state.loading=true;

      })
      .addCase(addDoctor.fulfilled,(state)=>{
        state.loading=false;
        
      })
      .addCase(addDoctor.rejected,(state,action)=>{
        state.error = action.payload
        state.loading=false;
        
      })
    }
  
});

export default doctorSlice.reducer;
export const { addUser,deleteUser,setCurrentUser,updateUser,nullError } = doctorSlice.actions;
