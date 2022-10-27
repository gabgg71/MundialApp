import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Principal } from '../components/Principal';

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Principal/>} />
          <Route exact path="/login" element={<Principal/>} />
          <Route path="*" element={<Principal />} />
        </Routes>
      </div>
    </Router>
  );
};
