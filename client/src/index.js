import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import authReducer from "state";
import authReducer from "./state";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react';
//all these imports so that we can save

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      },

    }),
});

//redux is one of the old libraries and it has most of its edge cases solved unlike others with the newer libraries


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}> 
        <App />
      </PersistGate>
    </Provider>

  </React.StrictMode>
);

