import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from './slices/userInfoSlice';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    taskState: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;