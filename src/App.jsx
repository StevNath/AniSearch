import { Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar";
import Home from "./page/home";
import About from "./page/about";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
