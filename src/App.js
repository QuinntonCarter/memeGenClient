import { Routes, Route } from "react-router-dom";
import MemeGenerator from "./components/MemeGen.js";
import MemesView from "./components/MemesView.js";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";

export default function App() {
  return (
    <div className="">
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
      <p className=""> quinnton carter 2023 </p>
      <Navbar />
    </div>
  );
}
