import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchUser from "./user.api";

/**
 * This is the state
 */
const initialState = {
  user: {
    name: "Uzoagulu Joshua",
    email: "uzoagulujoshua@yahoo.com",
    age: "24",
    image: "default.jpg",
  },
  project: {},
  status: "idle",
};

export const APIGetUser = createAsyncThunk("user/fetchUser", async () => {
  const data = await fetchUser();
  return data;
});

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(APIGetUser.fulfilled, (state, action) => {
        state.project = action.payload;
      })
      .addCase(APIGetUser.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const { loginUser } = userSlice.actions;

/**
 * This is more like the getters
 */
export const getUser = (state) => state.user.user;
export const getProject = (state) => state.user.project;

export default userSlice.reducer;
