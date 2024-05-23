import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-redux'
//import goalReducer from '../features/goals/goalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    
  },
})