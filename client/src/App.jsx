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
import PassQuestionsPage from "./pages/PassQuestionsPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/questions' element={<PassQuestionsPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
