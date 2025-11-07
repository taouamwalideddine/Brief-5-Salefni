import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SimulationPage from "./pages/SimulationPage"; 
import AdminDashboard from "./pages/AdminDashboard";
import RequestPage from "./pages/RequestPage";

const App = () => {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Simulation</Link>
      </nav>
      <Routes>
        <Route path="/" element={<SimulationPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/request" element={<RequestPage />} />
      </Routes>
    </Router>
  );
};

export default App;
