import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';

export const appStore = () => {
  return configureStore({
    reducer: {
      user: userSlice
    }
  });
};

export type AppStore = ReturnType<typeof appStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export { Provider as ReduxProvider } from 'react-redux';