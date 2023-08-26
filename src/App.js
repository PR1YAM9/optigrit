import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import GetLogs from "./components/GetUserLog/GetUserLog";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/getlogs" element={<GetLogs />} />
      </Routes>
    </>
  );
};

export default App;
