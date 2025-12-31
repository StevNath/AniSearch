import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./page/home";
import About from "./page/about";
import Schedules from "./page/schedules";
import AnimeDetails from "./page/animedetails";
import MangaDetails from "./page/mangadetails";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/manga/:id" element={<MangaDetails />} />
      </Routes>
    </>
  );
}
