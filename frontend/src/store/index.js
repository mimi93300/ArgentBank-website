import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from '../reducer/authUserSlice'; 

const store = configureStore({
  reducer: {
    user: authUserReducer, // Met à jour le reducer avec authUserReducer
  },
});

export default store;
