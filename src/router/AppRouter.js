import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../components/Login";
import { Principal } from '../components/Principal';
import { Register } from "../components/Register";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          {localStorage.getItem("usuario") && <Route exact path="/principal" element={<Principal/>} />}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};
