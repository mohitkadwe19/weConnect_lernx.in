import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  users: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setUsers: (state, action) => {
      // avoid logged in user from appearing in users list
      const filteredUsers = action.payload.users.filter(
        (user) => user._id !== state.user._id
      );
      state.users = filteredUsers;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setUsers,
} = authSlice.actions;
export default authSlice.reducer;
