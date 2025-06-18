"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store"; // <-- yeh sahi hai
import { persistor } from "./store/store"; // <-- yeh bhi sahi hai
import { PersistGate } from "redux-persist/integration/react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);