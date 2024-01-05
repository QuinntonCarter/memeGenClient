import "./index.css";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppProvider from "./context/appContext.js";

import { createRoot } from "react-dom/client";

const app = document.getElementById("root");
const root = createRoot(app);

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         // returns response (incoming) data for queries (when messing with cache updating etc)
//         memes: {
//           merge(existing, incoming) {
//             return incoming;
//           },
//         },
//       },
//     },
//   },
// });

// const client = new ApolloClient({
//   uri: "http://localhost:8080/graphql",
//   cache: cache,
// });

root.render(
  <BrowserRouter>
    <ChakraProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ChakraProvider>
  </BrowserRouter>
);
