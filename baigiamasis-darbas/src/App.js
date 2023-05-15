import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Gallery from "./pages/Gallery/Gallery";
import AlbumImages from "./components/AlbumImages/AlbumImages";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/galerija" element={<Gallery />} />
        <Route path="/albums/:albumId" element={<AlbumImages />} />
      </Routes>
    </Router>
  );
}

export default App;
