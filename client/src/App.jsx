import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";

import "./App.css";
import "./header.css";
import "./Footer.css";
import Footer from "./components/Footer";
import PassQuestionsPage from "./pages/PassQuestionsPage";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import QuestionsPage from "./pages/QuestionsPage";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/questions' element={<PassQuestionsPage />} />
          <Route path='/' element={<QuestionsPage />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
