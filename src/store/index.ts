import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'
import apiSlice from '../features/api/apiSlice'

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})