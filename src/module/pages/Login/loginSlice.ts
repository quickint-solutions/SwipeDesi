import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import loginHttpRequest from '../../../api/login/loginHttpRequest';

interface loginState {
  latestCollectionData: any[];
  bestCollectionData: any[];
  recentArticleData: any[];
  spotlightData: any[];
  bannerCategoryData: any[];
  saleBannerData: any[];
  testimonialData: any[];
  bannerImages: any[];
}

const initialState: loginState = {
  latestCollectionData: [],
  bestCollectionData: [],
  recentArticleData: [],
  spotlightData: [],
  bannerCategoryData: [],
  saleBannerData: [],
  testimonialData: [],
  bannerImages: [],
};

export const getLatestCollectioData = createAsyncThunk<any>('login/latestCollectionData', async (_, thunkAPI) => {
  try {
    const latestCollectionData = await loginHttpRequest.getLatestCollectioData();
    return latestCollectionData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const getBestCollectionData = createAsyncThunk<any>('login/bestCollectionData', async (_, thunkAPI) => {
  try {
    const bestCollectionData = await loginHttpRequest.getBestCollectionData();
    return bestCollectionData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const getRecentArticleData = createAsyncThunk<any>('login/recentArticleData', async (_, thunkAPI) => {
  try {
    const recentArticleData = await loginHttpRequest.getRecentArticleData();
    return recentArticleData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const getInTheSpotlightData = createAsyncThunk<any>('login/spotlightData', async (_, thunkAPI) => {
  try {
    const spotlightData = await loginHttpRequest.getSpotlightData();
    return spotlightData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const getBannerCategoryData = createAsyncThunk<any>('login/bannerCategory', async (_, thunkAPI) => {
  try {
    const spotlightData = await loginHttpRequest.getBannerCategory();
    return spotlightData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const getSaleBannerData = createAsyncThunk<any>('login/saleBannerData', async (_, thunkAPI) => {
  try {
    const saleBannerData = await loginHttpRequest.getSaleBannerData();
    return saleBannerData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const getTestimonialData = createAsyncThunk<any>('login/testionialData', async (_, thunkAPI) => {
  try {
    const testionialData = await loginHttpRequest.getTestimonialData();
    return testionialData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const getBannerImages = createAsyncThunk<any>('login/bannerImages', async (_, thunkAPI) => {
  try {
    const bannerImages = await loginHttpRequest.getBannerImages();
    return bannerImages;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLatestCollectioData.rejected, state => {
      state.latestCollectionData = [];
    });
    builder.addCase(getBestCollectionData.rejected, state => {
      state.bestCollectionData = [];
    });
    builder.addCase(getRecentArticleData.rejected, state => {
      state.recentArticleData = [];
    });
    builder.addCase(getInTheSpotlightData.rejected, state => {
      state.spotlightData = [];
    });
    builder.addCase(getBannerCategoryData.rejected, state => {
      state.bannerCategoryData = [];
    });
    builder.addCase(getSaleBannerData.rejected, state => {
      state.saleBannerData = [];
    });
    builder.addCase(getTestimonialData.rejected, state => {
      state.testimonialData = [];
    });
    builder.addCase(getBannerImages.rejected, state => {
      state.bannerImages = [];
    });

    builder.addMatcher(isAnyOf(getLatestCollectioData.fulfilled), (state, action) => {
      state.latestCollectionData = action.payload;
    });
    builder.addMatcher(isAnyOf(getBestCollectionData.fulfilled), (state, action) => {
      state.bestCollectionData = action.payload;
    });
    builder.addMatcher(isAnyOf(getRecentArticleData.fulfilled), (state, action) => {
      state.recentArticleData = action.payload;
    });
    builder.addMatcher(isAnyOf(getInTheSpotlightData.fulfilled), (state, action) => {
      state.spotlightData = action.payload;
    });
    builder.addMatcher(isAnyOf(getBannerCategoryData.fulfilled), (state, action) => {
      state.bannerCategoryData = action.payload;
    });
    builder.addMatcher(isAnyOf(getSaleBannerData.fulfilled), (state, action) => {
      state.saleBannerData = action.payload;
    });
    builder.addMatcher(isAnyOf(getTestimonialData.fulfilled), (state, action) => {
      state.testimonialData = action.payload;
    });
    builder.addMatcher(isAnyOf(getBannerImages.fulfilled), (state, action) => {
      state.bannerImages = action.payload;
    });
  },
});
