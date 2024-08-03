import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const token = getToken();

    const response = await axios.get('http://localhost:5001/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (itemData, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await axios.post('http://localhost:5001/api/cart/add', itemData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.log(error.response ? error.response.data : error.message);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ id, quantity }, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await axios.put(`http://localhost:5001/api/cart_items/${id}`, { quantity }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (id, { rejectWithValue }) => {
  try {
    const token = getToken();
    await axios.delete(`http://localhost:5001/api/cart_items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return id;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    totalItems: 0,
    discount: 0,
    status: null,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.cartItems || [];
        state.totalPrice = action.payload.totalPrice || 0;
        state.totalItems = action.payload.totalItems || 0;
        state.discount = action.payload.discount || 0;
        state.status = 'succeeded';
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(addItemToCart.fulfilled, (state, action) => {
        const updatedItems = state.items.filter(item => item._id !== action.payload._id);
        updatedItems.push(action.payload);
        state.items = updatedItems;
        state.totalItems = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
        state.totalPrice = updatedItems.reduce((acc, item) => acc + item.quantity * item.discountedPrice, 0);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const itemIndex = state.items.findIndex((item) => item._id === updatedItem._id);
        if (itemIndex !== -1) {
          state.items[itemIndex].quantity = updatedItem.quantity;
          state.items[itemIndex].discountedPrice = updatedItem.discountedPrice;
        }
        state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
        state.totalPrice = state.items.reduce((acc, item) => acc + item.quantity * item.discountedPrice, 0);
        state.status = 'succeeded';
      })    
     .addCase(updateCartItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export const selectCartItems = (state) => state.cart.items;


export default cartSlice.reducer;
