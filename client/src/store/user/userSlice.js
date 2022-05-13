import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchProject, Register, Login } from "./user.api";
import userService from "./user.api";

/**
 * Get user from local storage
 *
 */
const user = JSON.parse(localStorage.getItem("user"));

/**
 * This is the state
 */
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// export const APIGetUser = createAsyncThunk("user/fetchUser", async () => {
//   const data = await fetchProject();
//   return data;
// });

export const register = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    try {
      const res = await userService.register(data);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error.response);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toSting() ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const APILogin = createAsyncThunk("user/login", async (data) => {
//   console.log(data, "from slice");
//   const res = await Login(data);
//   return res;
// });

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    /**
     *
     *  this is the mutation
     */
    loginUser: (state, action) => {
      state.user.email = action.payload.email;
    },
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { loginUser, reset } = userSlice.actions;

/**
 * This is more like the getters
 */
export const getUser = (state) => state.user.user;
export const getProject = (state) => state.user.project;

export default userSlice.reducer;
