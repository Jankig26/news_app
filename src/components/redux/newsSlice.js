import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "dd883edbd37d4370b598d40b9ffbe6fb"; // Replace with your actual API key
const COUNTRY = "us"; // Fetch Indian news

export const fetchNews = createAsyncThunk("news/fetchNews", async (page = 1, { getState }) => {
  const { news } = getState();

  // Caching: If we already have data for this page, return cached data
  if (news.cache[page]) {
    return { articles: news.cache[page], page };
  }

  const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&page=${page}&pageSize=10&apiKey=${API_KEY}`;

  const response = await fetch(NEWS_API_URL);
  const data = await response.json();

  if (!data.articles || data.articles.length === 0) {
    throw new Error("No more news available.");
  }

  return { articles: data.articles, page };
});

const newsSlice = createSlice({
  name: "news",
  initialState: { articles: [], loading: false, error: null, page: 1, cache: {} },
  reducers: {
    clearNews: (state) => {
      state.articles = [];
      state.page = 1;
      state.cache = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload.page;
        state.articles = [...state.articles, ...action.payload.articles]; // Append new data for pagination
        state.cache[action.payload.page] = action.payload.articles; // Cache articles
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearNews } = newsSlice.actions;
export default newsSlice.reducer;
