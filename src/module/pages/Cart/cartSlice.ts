import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import cartHttpRequest from '../../../api/cart/cartHttpRequest';

interface cartState {
  cartDetail: [];
  cartTotal: any;
}

const initialState: cartState = {
  cartDetail: [],
  cartTotal: null,
};

export const getCartDetail = createAsyncThunk<any, number>('cart/cartData', async (userID, thunkAPI) => {
  try {
    const cartData = await cartHttpRequest.getCartItem(userID);
    return cartData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const getCartTotal = createAsyncThunk<any, number>('cart/cartTotal', async (userID, thunkAPI) => {
  try {
    const carTotal = await cartHttpRequest.getCartTotal(userID);
    return carTotal;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCartDetail.rejected, state => {
      state.cartDetail = [];
    });
    builder.addCase(getCartTotal.rejected, state => {
      state.cartTotal = null;
    });

    builder.addMatcher(isAnyOf(getCartDetail.fulfilled), (state, action) => {
      state.cartDetail = action.payload;
    });
    builder.addMatcher(isAnyOf(getCartTotal.fulfilled), (state, action) => {
      state.cartTotal = action.payload;
    });
  },
});
