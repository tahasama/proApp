import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import itnReducer from "./reducers/itnSlice";
import concreteReducer from "./reducers/concreteSlice";
import reinforcementReducer from "./reducers/reinforcementSlice";
import qorNcrReducer from "./reducers/qorNcrSlice";
import authReducer from "./reducers/authSlice";
import labReducer from "./reducers/labSlice";
import itpReducer from "./reducers/itpSlice";

export const store = configureStore({
  reducer: {
    itnz: itnReducer,
    concretez: concreteReducer,
    reinforcementz: reinforcementReducer,
    qorNcrz: qorNcrReducer,
    authUser: authReducer,
    labz: labReducer,
    itpz: itpReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
