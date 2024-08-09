import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error.response ? error.response.data : error.message);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (itemData, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/cart/add`, itemData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ id, quantity }, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_API}/api/cart_items/${id}`, { quantity }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error.response ? error.response.data : error.message);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (id, { rejectWithValue }) => {
  try {
    const token = getToken();
    await axios.delete(`${process.env.REACT_APP_BACKEND_API}/api/cart_items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return id;
  } catch (error) {
    console.error('Error removing cart item:', error.response ? error.response.data : error.message);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const calculateCartSummary = (items) => {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const totalDiscountedPrice = items.reduce((acc, item) => acc + item.quantity * item.discountedPrice, 0);
  const discount = items.reduce((acc, item) => acc + item.quantity * (item.price - item.discountedPrice), 0);
  
  return { totalItems, totalPrice, discount,totalDiscountedPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    totalDiscountedPrice: 0,
    totalItems: 0,
    discount: 0,
    status: null,
    error: null
  },
  reducers:
  {settotalItemsToZero:(state)=>{
    state.totalItems=0
  }}
  ,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.cartItems || [];
        const summary = calculateCartSummary(state.items);
        state.totalItems = summary.totalItems;
        state.totalPrice = summary.totalPrice;
        state.discount = summary.discount;
        state.totalDiscountedPrice = summary.totalDiscountedPrice;
        state.status = 'succeeded';
      })
      .addCase(fetchCart.rejected, (state, action) => {
        console.error('Fetching cart: rejected', action.payload);
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const itemIndex = state.items.findIndex(item => item._id === newItem._id);
        if (itemIndex !== -1) {
          state.items[itemIndex].quantity += newItem.quantity;
        } else {
          state.items.push(newItem);
        }
        const summary = calculateCartSummary(state.items);
        state.totalItems = summary.totalItems;
        state.totalPrice = summary.totalPrice;
        state.discount = summary.discount;
        state.totalDiscountedPrice = summary.totalDiscountedPrice;
        state.status = 'succeeded';
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        console.error('Adding item to cart: rejected', action.payload);
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const itemIndex = state.items.findIndex(item => item._id === updatedItem._id);
        if (itemIndex !== -1) {
          state.items[itemIndex].quantity = updatedItem.quantity;
        }
        const summary = calculateCartSummary(state.items);
        state.totalItems = summary.totalItems;
        state.totalPrice = summary.totalPrice;
        state.discount = summary.discount;
        state.totalDiscountedPrice = summary.totalDiscountedPrice;
        state.status = 'succeeded';
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        console.error('Updating cart item: rejected', action.payload);
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const removedId = action.payload;
        state.items = state.items.filter(item => item._id !== removedId);
        const summary = calculateCartSummary(state.items);
        state.totalItems = summary.totalItems;
        state.totalPrice = summary.totalPrice;
        state.discount = summary.discount;
        state.totalDiscountedPrice = summary.totalDiscountedPrice;
        state.status = 'succeeded';
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        console.error('Removing cart item: rejected', action.payload);
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectCartItems = (state) => state.cart.items;

export const {settotalItemsToZero}=cartSlice.actions;

export default cartSlice.reducer;
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const getToken = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

// export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
//   try {
//     const token = getToken();
//     const response = await axios.get('http://localhost:5001/api/cart', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching cart:', error.response ? error.response.data : error.message);
//     return rejectWithValue(error.response ? error.response.data : error.message);
//   }
// });

// export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (itemData, { rejectWithValue }) => {
//   try {
//     const token = getToken();
//     const response = await axios.post('http://localhost:5001/api/cart/add', itemData, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
//     return rejectWithValue(error.response ? error.response.data : error.message);
//   }
// });

// export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ id, quantity }, { rejectWithValue }) => {
//   try {
//     const token = getToken();
//     const response = await axios.put(`http://localhost:5001/api/cart_items/${id}`, { quantity }, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error updating cart item:', error.response ? error.response.data : error.message);
//     return rejectWithValue(error.response ? error.response.data : error.message);
//   }
// });

// export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (id, { rejectWithValue }) => {
//   try {
//     const token = getToken();
//     await axios.delete(`http://localhost:5001/api/cart_items/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return id;
//   } catch (error) {
//     console.error('Error removing cart item:', error.response ? error.response.data : error.message);
//     return rejectWithValue(error.response ? error.response.data : error.message);
//   }
// });

// const calculateCartSummary = (items) => {
//   const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
//   const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.discountedPrice, 0);
//   const discount = items.reduce((acc, item) => acc + item.quantity * (item.price - item.discountedPrice), 0);

//   return { totalItems, totalPrice, discount };
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//     totalPrice: 0,
//     totalItems: 0,
//     discount: 0,
//     status: null,
//     error: null
//   },
//   reducers:
//   {settotalItemsToZero:(state)=>{
//     state.totalItems=0
//   }}
//   ,
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.items = action.payload.cartItems || [];
//         const summary = calculateCartSummary(state.items);
//         state.totalItems = summary.totalItems;
//         state.totalPrice = summary.totalPrice;
//         state.discount = summary.discount;
//         state.status = 'succeeded';
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         console.error('Fetching cart: rejected', action.payload);
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(addItemToCart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addItemToCart.fulfilled, (state, action) => {
//         const newItem = action.payload;
//         const itemIndex = state.items.findIndex(item => item._id === newItem._id);
//         if (itemIndex !== -1) {
//           state.items[itemIndex].quantity += newItem.quantity;
//         } else {
//           state.items.push(newItem);
//         }
//         const summary = calculateCartSummary(state.items);
//         state.totalItems = summary.totalItems;
//         state.totalPrice = summary.totalPrice;
//         state.discount = summary.discount;
//         state.status = 'succeeded';
//       })
//       .addCase(addItemToCart.rejected, (state, action) => {
//         console.error('Adding item to cart: rejected', action.payload);
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(updateCartItem.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(updateCartItem.fulfilled, (state, action) => {
//         const updatedItem = action.payload;
//         const itemIndex = state.items.findIndex(item => item._id === updatedItem._id);
//         if (itemIndex !== -1) {
//           state.items[itemIndex].quantity = updatedItem.quantity;
//         }
//         const summary = calculateCartSummary(state.items);
//         state.totalItems = summary.totalItems;
//         state.totalPrice = summary.totalPrice;
//         state.discount = summary.discount;
//         state.status = 'succeeded';
//       })
//       .addCase(updateCartItem.rejected, (state, action) => {
//         console.error('Updating cart item: rejected', action.payload);
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(removeCartItem.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(removeCartItem.fulfilled, (state, action) => {
//         const removedId = action.payload;
//         state.items = state.items.filter(item => item._id !== removedId);
//         const summary = calculateCartSummary(state.items);
//         state.totalItems = summary.totalItems;
//         state.totalPrice = summary.totalPrice;
//         state.discount = summary.discount;
//         state.status = 'succeeded';
//       })
//       .addCase(removeCartItem.rejected, (state, action) => {
//         console.error('Removing cart item: rejected', action.payload);
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const selectCartItems = (state) => state.cart.items;

// export const {settotalItemsToZero}=cartSlice.actions;

// export default cartSlice.reducer;