import { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Container, VStack } from "@chakra-ui/react";

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
      <Header />

      <VStack
        className={"appStackContainer"}
        paddingBottom={"2em"}
        justifyContent={"center"}
      >
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
      </VStack>
      <Navbar />
    </ApolloProvider>
  );
}
