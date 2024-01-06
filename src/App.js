import { useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, VStack } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

import MemeGenerator from "./components/MemeGen.js";
import MemesView from "./components/MemesView.jsx";
import Navbar from "./components/Navbar.js";
import client from "./apolloClient.js";

export default function App() {
  const memeTemplateRef = useRef(null);
  // const [randomMeme, setRandomMeme] = useState([]);

  return (
    <ApolloProvider client={client}>
      {/* // CSS // Fix vertical spacing */}
      <Box className={"appContainer"} display="flex">
        <VStack className="appStack" margin="auto" width={"90vw"}>
          <Routes>
            <Route
              path="/"
              element={
                <MemeGenerator
                  ref={memeTemplateRef}
                  // randomMeme={randomMeme}
                  // setRandomMeme={setRandomMeme}
                />
              }
            />
            <Route path="/memes" element={<MemesView />} />
          </Routes>
        </VStack>
        <Navbar />
      </Box>
    </ApolloProvider>
  );
}
