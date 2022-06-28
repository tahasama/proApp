import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import itnReducer from "./reducers/itnSlice";
import concreteReducer from "./reducers/concreteSlice";
import reinforcementReducer from "./reducers/reinforcementSlice";

export const store = configureStore({
  reducer: {
    itnz: itnReducer,
    concretez: concreteReducer,
    reinforcementz: reinforcementReducer,
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
