import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer, // Ajoute ici d'autres reducers si besoin
  },
});

export default store;
