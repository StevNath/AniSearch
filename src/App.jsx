import { Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar";
import Home from "./page/home";
import About from "./page/about";
import Schedules from "./page/schedules";
import SearchResults from "./page/SearchResult";
import AnimeDetail from "./page/animedetail";
import Genre from "./page/genre";
import SearchAnimeGenre from "./page/searchgenre";
import SearchMangaGenre from "./page/searchgenremanga";
import ComingSoon from "./page/coomingsoon";
import MangaBrowse from "./page/mangabrowse";
import MangaDetail from "./page/mangadetail";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/search" element={<SearchResults />} /> {/* 👈 tambahkan ini */}
        <Route path="/anime/:id" element={<AnimeDetail />} /> {/* 👈 ini baru */}
        <Route path="/Genre" element={<Genre />} />
        <Route path="/anime/genre/:genreName" element={<SearchAnimeGenre />} />
        <Route path="/manga/genre/:genreName" element={<SearchMangaGenre />} />
        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="/latest-manga" element={<MangaBrowse />} />
        <Route path="/manga/:id" element={<MangaDetail />} />
      </Routes>
    </>
  );
}
