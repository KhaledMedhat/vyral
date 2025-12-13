import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { authApi } from "./apis/auth.api";
// import { userRoute } from "../routes/userRoute";
// import { channelRoute } from "../routes/channelRoute";
import userReducer from "./slices/user/user-slice";
import channelReducer from "./slices/channels/channels-slice";
import { channelApi } from "./apis/channel.api";
// import appReducer from "../slices/app/appSlice";
// import { messageRoute } from "../routes/messageRoute";
// import callSlice from "../slices/call/callSlice";

const persistConfig = {
  key: "root",
  storage,
};

// Create separate persist configs for each reducer
const userPersistConfig = {
  ...persistConfig,
  key: "user",
};

const channelPersistConfig = {
  ...persistConfig,
  key: "channels",
};

// const callPersistConfig = {
//   ...persistConfig,
//   key: "call",
//   // Exclude callConsumers from persistence since it contains non-serializable objects
//   blacklist: ["callConsumers"],
// };

// const appPersistConfig = {
//   ...persistConfig,
//   key: "app",
// };

// Create persisted reducers
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
// const persistedAppReducer = persistReducer(appPersistConfig, appReducer);
// const persistedCallReducer = persistReducer(callPersistConfig, callSlice);
const persistedChannelReducer = persistReducer(channelPersistConfig, channelReducer);

export const store = configureStore({
  reducer: {
    // Add the RTK Query reducer to the store
    [authApi.reducerPath]: authApi.reducer,
    // [userRoute.reducerPath]: userRoute.reducer,
    [channelApi.reducerPath]: channelApi.reducer,
    // [messageRoute.reducerPath]: messageRoute.reducer,
    // call: persistedCallReducer,
    user: persistedUserReducer,
    // app: persistedAppReducer,
    channels: persistedChannelReducer,
  },
  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "call/setCallConsumers",
          "call/updateConsumerVideo",
          "call/updateConsumerCallType",
          "call/removeConsumer",
          "call/removeConsumerVideo",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp", "meta.baseQueryMeta"],
        // Ignore these paths in the state
        ignoredPaths: [
          "user",
          "app",
          "call.callConsumers",
          "call.updateConsumerVideo ",
          "call.removeConsumerVideo",
          "call.removeConsumer",
          "call.updateConsumerCallType",
        ],
      },
    }).concat(
      authApi.middleware,
      //   userRoute.middleware,
      channelApi.middleware
      //   messageRoute.middleware
    ), // Add the middleware for RTK Query
});

// Export the store type for TypeScript
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
