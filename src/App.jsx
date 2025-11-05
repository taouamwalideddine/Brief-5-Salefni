import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SimulationPage from "./pages/SimulationPage"; 

const App = () => {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Simulation</Link>
      </nav>
      <Routes>
        <Route path="/" element={<SimulationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
