import "./App.css";

import axios from "axios";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { render } from "react-dom";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Gallery from "./pages/Gallery/Gallery";
import AlbumImages from "./components/AlbumImages/AlbumImages";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import BlogPage from "./pages/Blog/BlogPage";
import Login from "./pages/Login/Login";
import Registration from "./pages/Register/Register";
import AdminNavBar from "./components/AdminNavBar/AdminNavBar";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import BlogEntryPage from "./components/BlogEntryPage/BlogEntryPage";
import TranslationProvider from "./components/TranslationContext/TranslationContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post("https://api.gamtosfotografija.lt/api/authenticate", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIsAuthenticated(response.status === 200);
        })
        .catch((error) => {
          setIsAuthenticated(error.response.status === 200);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <TranslationProvider>
        <NavBar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galerija" element={<Gallery />} />
          <Route path="/albums/:albumId" element={<AlbumImages />} />
          <Route path="/blog/:name" element={<BlogEntryPage />} />
          <Route path="/apie" element={<About />} />
          <Route path="/kontaktai" element={<Contact />} />
          <Route path="/tinklarastis" element={<BlogPage />} />
          <Route path="/prisijungimas" element={<Login />} />
          {isAuthenticated ? (
            <Route path="/registracija" element={<Registration />} />
          ) : (
            <Route path="/registracija" element={<Home />} />
          )}
          {isAuthenticated ? (
            <Route path="/administravimas" element={<AdminPanel />} />
          ) : (
            <Route path="/administravimas" element={<Home />} />
          )}
        </Routes>
        {isAuthenticated && <AdminNavBar />}
      </TranslationProvider>
    </Router>
  );
}

export default App;
