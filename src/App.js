import { Routes, Route } from "react-router-dom";
import MemeGenerator from "./components/MemeGen.js";
import MemesView from "./components/MemesView.js";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-blue-200">
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
      <p className=" text-center text-xs font-mono text-blue-300">
        {" "}
        Quinnton Carter 2021{" "}
      </p>
      <Navbar />
    </div>
  );
}
