import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Header/Header'
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Questionnaire from "./components/Questionnaire/Questionnaire";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Home />
          </>
        }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/questionare" element={<Questionnaire />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
