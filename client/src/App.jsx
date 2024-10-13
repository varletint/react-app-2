import { useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./App.css";
import "./header.css";
import "./Footer.css";
import "./postpage.css";
import PostPage from "./pages/PostPage";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
