import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "dd883edbd37d4370b598d40b9ffbe6fb"; // Replace this with your actual API key

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const timestamp = new Date().getTime(); // Force fresh request to avoid caching

  // ✅ Updated: Fetch INDIAN news with a Technology query
  const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&_=${timestamp}`;


  console.log("Fetching news from API:", NEWS_API_URL); // ✅ Debugging URL

  const response = await fetch(NEWS_API_URL);
  const data = await response.json();

  console.log("API Response:", data); // ✅ Debugging response

  if (!data.articles || data.articles.length === 0) {
    throw new Error("No new news available.");
  }

  return data.articles;
});

const newsSlice = createSlice({
  name: "news",
  initialState: { articles: [], loading: false, error: null },
  reducers: {
    clearNews: (state) => {
      state.articles = []; // ✅ Clears old news before fetching new ones
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
        state.articles = action.payload;
        console.log("Updated Redux Store:", state.articles); // ✅ Debug Redux store update
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearNews } = newsSlice.actions;
export default newsSlice.reducer;
