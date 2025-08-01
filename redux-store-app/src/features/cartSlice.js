import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  total: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({...action.payload, quantity: 1})
      }
      
      state.total += action.payload.price
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id)
      
      if (itemIndex >= 0) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1
        } else {
          state.items.splice(itemIndex, 1)
        }
        state.total -= action.payload.price
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
    }
  }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer