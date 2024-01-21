import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
let persistor = persistStore(store);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={"loading"}>
          <App />
        </PersistGate>
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>
);
