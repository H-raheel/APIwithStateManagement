
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../App';
const initialState = {
  users: [],
  doctors:[],
  types:[],
  currentDoctor:"",
  loading:false
};

export const doctorCategory=createAsyncThunk(
  "doctor/doctorCategory",
  async(_,{rejectWithValue})=>{
   
    try {
      const response = await axiosInstance.get("/categories/list",
       );
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

    export const deleteDoctor = createAsyncThunk(
      "doctor/deleteDoctor",
      async (id, { rejectWithValue }) => {
        try {
          
          const response = await axiosInstance.delete(`/doctors/delete/${id}`, {
           
          });
          console.log(response.data);
          return response.data; 
        } catch (error) {
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
    export const showDoctor = createAsyncThunk(
      "doctor/showDoctor",
      async (id, { rejectWithValue }) => {
        try {
          
          const response = await axiosInstance.get(`/doctors/show/${id}`, {
           
          });
          console.log(response.data);
          return response.data; 
        } catch (error) {
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
    export const editDoctor = createAsyncThunk(
      "doctor/editDoctor",
      async (data, { rejectWithValue }) => {
        try {
          
          const response = await axiosInstance.put(`/doctors/update/${data.id}`, 
data.data,
          );
          console.log(response.data);
          return response.data; 
        } catch (error) {
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
      .addCase(showDoctor.pending,(state)=>{
        state.error=null;
        
        state.loading=true;

      })
      .addCase(showDoctor.fulfilled,(state,action)=>{
        state.loading=false;
        state.currentDoctor=action.payload.Doctors;
        
      })
      .addCase(showDoctor.rejected,(state,action)=>{
        state.error = action.payload
        state.loading=false;
        
      })
      
    
      .addCase(deleteDoctor.pending,(state)=>{
        state.error=null;
        state.loading=true;

      })
      .addCase(deleteDoctor.fulfilled,(state)=>{
        state.loading=false;
        
      })
      .addCase(deleteDoctor.rejected,(state,action)=>{
        state.error = action.payload
        state.loading=false;
        
      })
      .addCase(editDoctor.pending,(state)=>{
        state.error=null;
        state.loading=true;

      })
      .addCase(editDoctor.fulfilled,(state)=>{
        state.loading=false;
        
      })
      .addCase(editDoctor.rejected,(state,action)=>{
        
        state.error = action.payload
        state.loading=false;
        console.log(state.error);
        
      })
    }
  
});

export default doctorSlice.reducer;
export const { addUser,deleteUser,setCurrentUser,updateUser,nullError } = doctorSlice.actions;
