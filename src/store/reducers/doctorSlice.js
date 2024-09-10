
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../App';
import { findCategoryForUser } from '../../helpers/findType';
const initialState = {
  users: [],
  doctors:[],
  types:[],
  editError:null,
  currentDoctor:"",
  
  loading:false,
  error:null,
};

export const doctorCategory=createAsyncThunk(
  "doctor/doctorCategory",
  async(_,{rejectWithValue})=>{
   console.log("in")
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
        state.editError=null;
        state.error = null;
        console.log(state.editError)
      },
    
    },
    extraReducers: (builder) => {
      builder
      .addCase(doctorCategory.fulfilled,(state,action)=>{
        state.types=action.payload.DoctorsCategory;
        console.log(state.types);
      })
      .addCase(doctorCategory.rejected,(state)=>{
        state.types=null;
      })
      .addCase(showDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(showDoctors.fulfilled,(state,action)=>{
        console.log(state.types);
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
        state.error=null;
        
      })
      .addCase(addDoctor.rejected,(state,action)=>{
        state.error = action.payload
        console.log(state.error);
        state.loading=false;
        
      })
      .addCase(showDoctor.pending,(state)=>{
        state.error=null;
        
        state.loading=true;

      })
      .addCase(showDoctor.fulfilled,(state,action)=>{
        console.log(state.types);
        state.loading=false;
        state.currentDoctor=action.payload.Doctors;
        const category=findCategoryForUser(state.currentDoctor,state.types);
        state.currentDoctor={...state.currentDoctor,category};
        console.log(state.currentDoctor)
      
        
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
        
        state.editError = action.payload
        state.loading=false;
        console.log(state.editError);
        
      })
    }
  
});

export default doctorSlice.reducer;
export const { addUser,deleteUser,setCurrentUser,updateUser,nullError } = doctorSlice.actions;
