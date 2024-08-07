import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSucess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ticketSubmitStart: (state) => {
      // in progress
    },
    ticketSubmitSuccess: (state, action) => {
      // in progress
    },
    ticketSubmitFailure: (state, action) => {
      // in progress
    },

    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { signInStart, signInSucess, signInFailure, updateStart, updateSuccess, updateFailure, ticketSubmitStart, ticketSubmitSuccess, ticketSubmitFailure, signoutSuccess } = userSlice.actions;

export default userSlice.reducer;

// adapted from: https://github.com/sahandghavidel/mern-blog/tree/main