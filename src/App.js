import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import {
  Box,
  Spacer,
  VStack,
  Flex,
  Tab,
  Tabs,
  TabList,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

import MemeGenerator from "./components/MemeGen.js";
import MemesView from "./components/MemesView.js";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";

export default function App() {
  return (
    // CSS // Fix vertical spacing
    <Box display="block" margin={"auto 2vw 0.5vw"} height={"100%"}>
      <VStack margin="auto" height={"100%"}>
        <Navbar />
        <Spacer />
        <Routes>
          <Route path="/" element={<MemeGenerator />} />
          <Route path="/memes" element={<MemesView />} />
        </Routes>
        <Text as="p" fontSize={13}>
          Quinnton Carter 2023
        </Text>
      </VStack>
    </Box>
  );
}
