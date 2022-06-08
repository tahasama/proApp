import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import itnReducer from "./reducers/itnSlice";

export const store = configureStore({
  reducer: {
    itnz: itnReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
