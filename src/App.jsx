import { Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar";
import Home from "./page/home";
import About from "./page/about";
import Schedules from "./page/schedules";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/schedules" element={<Schedules />} />
      </Routes>
    </>
  );
}
