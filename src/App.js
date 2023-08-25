import { Routes, Route } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import MemeGenerator from "./components/MemeGen.js";
import MemesView from "./components/MemesView.js";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";

export default function App() {
  return (
    <VStack>
      <Header />
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
      <Navbar />
    </VStack>
  );
}
