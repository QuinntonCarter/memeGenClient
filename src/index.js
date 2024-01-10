import "./index.css";
import React from "react";
import {
  ChakraProvider,
  Container,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
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
        {/* <App /> */}
        <Container
          justifyContent={"center"}
          alignContent={"center"}
          display={"flex"}
          flexDirection={"column"}
          height={"100vh"}
        >
          <Stack
            background={"white"}
            p={"10px"}
            borderRadius={"6px"}
            w={"auto"}
          >
            <Text as="h1" fontWeight={"bold"} size={"xxl"}>
              Under maintenance
            </Text>
            <Image
              src={
                "https://media.tenor.com/v7Z6_aeZ1ocAAAAe/patrick-star-idk.png"
              }
              title="under construction"
            />
          </Stack>
        </Container>
      </AppProvider>
    </ChakraProvider>
  </BrowserRouter>
);
