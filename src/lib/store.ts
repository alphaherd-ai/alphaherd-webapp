import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import appSlice from './features/appSlice';
import transactionAmountSlice from './features/transactionAmount/transactionAmountSlice';
import { persistStore, persistReducer, PERSIST, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER } from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const appReducer = combineReducers({
  user: userSlice,
  app: appSlice,
  transactionAmount: transactionAmountSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    storage.removeItem('persist:root'); // Clear persisted state
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user', 'app', 'transactionAmount'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST],
      },
    }),
});

export const appStore = () => {
  return store;
};

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof appStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export { Provider as ReduxProvider } from 'react-redux';

export default store; // Export the store directly