import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
    searchQuery: '',
    sortBy: 'date',
  },
  reducers: {
    addComment(state, action) {
      const { postId, comment } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.comments = [...(post.comments || []), comment];
      }
    },
    editPost(state, action) {
      const { postId, content } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.body = content;
      }
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.map(post => ({ ...post, comments: [] }));
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addComment, editPost, setSearchQuery, setSortBy } = postsSlice.actions;
export default postsSlice.reducer;
