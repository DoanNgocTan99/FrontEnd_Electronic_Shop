import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartQuantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItems.findIndex(
        (x) => x.productId === newItem.productId
      );
      if (index >= 0) {
        state.cartItems[index].count += newItem.count;
      } else {
        state.cartItems.push(newItem);
      }
    },

    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItems.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
    },

    removeFromCart(state, action) {
      console.log(action);
      const idNeedToRemove = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.id !== idNeedToRemove);
    },

    removeAllCart(state, action) {
      const idUser = action.payload;
      // find user then delete
      state.cartItems = [];
    },
  },
});

const { actions, reducer } = cartSlice;
export const { addToCart, setQuantity, removeFromCart, removeAllCart } =
  actions;
export default reducer;
