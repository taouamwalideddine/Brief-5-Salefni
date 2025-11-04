import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import SumulationPage from "./pages/SimulationPage";
import AdminDashboard from "./pages/AdminDashboard";
import RequestPage from "./pages/RequestPage";

const App = () => {
    return (
        <Router>
            <nav style={{marginBottom : "20px"}}>
                <link to="/">Simulation</link>|{" "}
                <link to="/request">Credit Request</link>|{" "}
                <link to="/admin">Admin Dashboard</link>
            </nav>
            <Route>
                <Route path = "/" element={<SimulationPage />}></Route>
                <Route path = "/request" element={<RequestPage />}></Route>
                <Route path = "/admin" element={<AdminDashboard />}></Route>
            </Route>
        </Router>
    );
};

export default App;