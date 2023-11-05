import { combineReducers } from 'redux'

import apiSlice from '../features/api/apiSlice'

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer
})

export default rootReducer