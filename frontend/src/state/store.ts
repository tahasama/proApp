import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import itnReducer from "./reducers/itnSlice";
import concreteReducer from "./reducers/concreteSlice";

export const store = configureStore({
  reducer: {
    itnz: itnReducer,
    concretez: concreteReducer,
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
