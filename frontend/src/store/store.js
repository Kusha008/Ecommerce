import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage for web
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';

// Combine the reducers into a single root reducer
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

// Define persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart'], // Specify which slices of state to persist
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
