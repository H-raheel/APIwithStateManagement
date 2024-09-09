import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../App";

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("users/create", data);
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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("users/login", data); 
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authentication: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
    },
    setError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
       localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
      
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload;
        console.log(state.error);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error=null;
        
        localStorage.setItem("token", action.payload.access_token);
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { authentication, logout, setError } = authSlice.actions;
export default authSlice.reducer;
