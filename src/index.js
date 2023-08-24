import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./context/appContext.js";
import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import "./index.css";

const app = document.getElementById("root");
const root = createRoot(app);

root.render(
  <BrowserRouter>
    <ChakraProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ChakraProvider>
  </BrowserRouter>
);
