import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import todoSlice from "./features/todoSlice";


const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

  const reducer = combineReducers({
    todo: todoSlice
  })

  const persistedReducer = persistReducer(persistConfig,reducer)


  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  })

  // Need this in order to use useDipatch and useSelctor
export const Dispatch: () => typeof store.dispatch = useDispatch;
export const UseSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;