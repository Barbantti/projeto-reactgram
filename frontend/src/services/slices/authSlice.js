import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../service/authService";

// Path redux => slice connect to service, and after go to store to be shared (users info, token...) with project.

// Auth Slice authentication

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

// Auth is the name of the entity we are working with and register is the current action and then is the second argument which is always a function

// Register an user and sign in function

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const data = await authService.register(user);

      if (data) {
        console.log("Response.status 201");
        return data;
      }
    } catch (error) {
      if (error.response) {
        // Check for errors
        console.log("Response status register: ", error.response.data.errors);
        return thunkAPI.rejectWithValue(error.response.data.errors[0]);
      } else {
        return thunkAPI.rejectWithValue("Unknown register error");
      }
    }
  }
);

// Logout an user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Sign in an user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const data = await authService.login(user);

    if (data) {
      console.log("Response login status 201");
      return data;
    }
  } catch (error) {
    if (error.response) {
      // Check for errors
      console.log("Response status login: ", error.response.data.errors);
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    } else {
      return thunkAPI.rejectWithValue("Unknown login error");
    }
  }
});

// Slice functions
// Will be part of executions, working with the current state of each request directly with API

export const authSlice = createSlice({
  // It will be called in the store by "auth"
  name: "auth",
  // Initial state of "auth"
  initialState,
  reducers: {
    // Reset everything to initial state
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.errorMessage = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.errorMessage = "Error to login";
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
