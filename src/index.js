import "./index.css";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppProvider from "./context/appContext.js";

import { createRoot } from "react-dom/client";

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
