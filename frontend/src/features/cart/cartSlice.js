import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const token = getToken();
    console.log('Fetching cart with token:', token);
    const response = await axios.get('http://localhost:5001/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Cart fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error.response ? error.response.data : error.message);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (itemData, { rejectWithValue }) => {
  try {
    const token = getToken();
    console.log('Adding item to cart with token:', token, 'and data:', itemData);
    const response = await axios.post('http://localhost:5001/api/cart/add', itemData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Item added to cart successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ id, quantity }, { rejectWithValue }) => {
  try {
    const token = getToken();
    console.log('Updating cart item with ID:', id, 'to quantity:', quantity, 'with token:', token);
    const response = await axios.put(`http://localhost:5001/api/cart_items/${id}`, { quantity }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Cart item updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error.response ? error.response.data : error.message);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (id, { rejectWithValue }) => {
  try {
    const token = getToken();
    console.log('Removing cart item with ID:', id, 'with token:', token);
    await axios.delete(`http://localhost:5001/api/cart_items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Cart item removed successfully:', id);
    return id;
  } catch (error) {
    console.error('Error removing cart item:', error.response ? error.response.data : error.message);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const calculateCartSummary = (items) => {
  console.log('Calculating cart summary for items:', items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.discountedPrice, 0);
  const discount = items.reduce((acc, item) => acc + item.quantity * (item.price - item.discountedPrice), 0);

  console.log('Cart summary:', { totalItems, totalPrice, discount });
  return { totalItems, totalPrice, discount };
};

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
  reducers:
  {settotalItemsToZero:(state)=>{
    state.totalItems=0
  }}
  ,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        console.log('Fetching cart: pending');
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log('Fetching cart: fulfilled');
        state.items = action.payload.cartItems || [];
        console.log('Cart items:', state.items);
        const summary = calculateCartSummary(state.items);
        state.totalItems = summary.totalItems;
        state.totalPrice = summary.totalPrice;
        state.discount = summary.discount;
        state.status = 'succeeded';
      })
      .addCase(fetchCart.rejected, (state, action) => {
        console.error('Fetching cart: rejected', action.payload);
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        console.log('Adding item to cart: pending');
        state.status = 'loading';
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        console.log('Adding item to cart: fulfilled');
        const newItem = action.payload;
        console.log('New item:', newItem);
        const itemIndex = state.items.findIndex(item => item._id === newItem._id);
        if (itemIndex !== -1) {
          state.items[itemIndex].quantity += newItem.quantity;
        } else {
          state.items.push(newItem);
        }
        console.log('Updated items:', state.items);
        const summary = calculateCartSummary(state.items);
        state.totalItems = summary.totalItems;
        state.totalPrice = summary.totalPrice;
        state.discount = summary.discount;
        state.status = 'succeeded';
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        console.error('Adding item to cart: rejected', action.payload);
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateCartItem.pending, (state) => {
        console.log('Updating cart item: pending');
        state.status = 'loading';
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        console.log('Updating cart item: fulfilled');
        const updatedItem = action.payload;
        console.log('Updated item:', updatedItem);
        const itemIndex = state.items.findIndex(item => item._id === updatedItem._id);
        if (itemIndex !== -1) {
          state.items[itemIndex].quantity = updatedItem.quantity;
        }
        console.log('Updated items:', state.items);
        const summary = calculateCartSummary(state.items);
        state.totalItems = summary.totalItems;
        state.totalPrice = summary.totalPrice;
        state.discount = summary.discount;
        state.status = 'succeeded';
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        console.error('Updating cart item: rejected', action.payload);
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        console.log('Removing cart item: pending');
        state.status = 'loading';
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        console.log('Removing cart item: fulfilled');
        const removedId = action.payload;
        console.log('Removed item ID:', removedId);
        state.items = state.items.filter(item => item._id !== removedId);
        console.log('Updated items:', state.items);
        const summary = calculateCartSummary(state.items);
        state.totalItems = summary.totalItems;
        state.totalPrice = summary.totalPrice;
        state.discount = summary.discount;
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
//     console.log(response.data);
    
//     return response.data;
//   } catch (error) {
//     console.log(error.response ? error.response.data : error.message);
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
//     return rejectWithValue(error.response ? error.response.data : error.message);
//   }
// });

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
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.items = action.payload.cartItems || [];
//         state.totalPrice = action.payload.totalPrice || 0;
//         state.totalItems = action.payload.totalItems || 0;
//         state.discount = action.payload.discount || 0;
//         state.status = 'succeeded';
//       })    
      
    
      
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(addItemToCart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addItemToCart.fulfilled, (state, action) => {
//         console.log('Added casitem:qwdf');
//         console.log('Added item:', action.payload);
//         console.log('Added item:qwdf');
//         const itemIndex = state.items.findIndex(item => item._id === action.payload._id);
//         if (itemIndex !== -1) {
//             state.items[itemIndex].quantity += action.payload.quantity;
//         } else {
//             state.items.push(action.payload);
//         }
//         state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
//         state.totalPrice = state.items.reduce((acc, item) => acc + item.quantity * (item.discountedPrice || 0), 0);
//         state.status = 'succeeded';
//     })
    
//       .addCase(addItemToCart.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(updateCartItem.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(updateCartItem.fulfilled, (state, action) => {
//         const updatedItem = action.payload;
//         const itemIndex = state.items.findIndex((item) => item._id === updatedItem._id);
//         if (itemIndex !== -1) {
//           state.items[itemIndex].quantity = updatedItem.quantity;
//           state.items[itemIndex].discountedPrice = updatedItem.discountedPrice;
//         }
//         state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
//         state.totalPrice = state.items.reduce((acc, item) => acc + item.quantity * item.discountedPrice, 0);
//         state.status = 'succeeded';
//       })    
//      .addCase(updateCartItem.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(removeCartItem.pending, (state) => {
//         state.status = 'loading';
//       })

//       .addCase(removeCartItem.fulfilled, (state, action) => {
//         state.items = state.items.filter((item) => item._id !== action.payload);
//         // Recalculate the total items and total price after an item is removed
//         state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
//         state.totalPrice = state.items.reduce((acc, item) => acc + item.quantity * item.discountedPrice, 0);
//         state.status = 'succeeded';
//     })
    
//       .addCase(removeCartItem.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//   },
// });


// export const selectCartItems = (state) => state.cart.items;


// export default cartSlice.reducer;
