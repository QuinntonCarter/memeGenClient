import { Routes, Route } from "react-router-dom";
import { Box, Container, Spacer, VStack } from "@chakra-ui/react";
import MemeGenerator from "./components/MemeGen.js";
import MemesView from "./components/MemesView.js";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";

export default function App() {
  return (
    <Box
      display="flex"
      // pt="10%"
    >
      <VStack margin="auto">
        {/* <Header /> */}
        {/* <Spacer /> */}
        <Routes>
          <Route
            path="/"
            element={<MemeGenerator />}
          />
          <Route
            path="/memes"
            element={<MemesView />}
          />
        </Routes>
        {/* <p className=""> Quinnton Carter 2023 </p> */}
        <Spacer />
        <Navbar />
      </VStack>
    </Box>
  );
}
