import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import MemoriesContextProvider from "./data/MemoriesContextProvider";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import ReactDOM from "react-dom";

const container = document.getElementById("root");
const root = createRoot(container!);
defineCustomElements(window);

root.render(
  <React.StrictMode>
    <MemoriesContextProvider>
      <App />
    </MemoriesContextProvider>
  </React.StrictMode>,

);
