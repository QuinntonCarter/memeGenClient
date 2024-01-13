import { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { VStack } from "@chakra-ui/react";

import MemeGenerator from "./components/MemeGen.js";
import MemesView from "./components/MemesView.jsx";
import Navbar from "./components/Navbar.js";
import client from "./apolloClient.js";
import Header from "./components/Header.js";

export default function App() {
  const memeTemplateRef = useRef(null);

  return (
    <ApolloProvider client={client}>
      {/* // CSS // Fix vertical spacing */}
      <VStack
        className={"appStackContainer"}
        // paddingBottom={"2em"}
      >
        <Header />
        {/* <Stack> */}
        <Routes>
          <Route
            path="/"
            element={<MemeGenerator ref={memeTemplateRef} />}
          />
          <Route
            path="/memes"
            element={<MemesView />}
          />
        </Routes>
        {/* </Stack> */}
        <Navbar />
      </VStack>
    </ApolloProvider>
  );
}
