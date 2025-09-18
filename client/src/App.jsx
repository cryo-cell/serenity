import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Editor from "./components/Editor"; // Ensure this path is correct
import "leaflet/dist/leaflet.css";
import ChoosePlan from "./components/ChoosePlan"; // wherever it lives
import Success from "./components/Success"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/choose-plan" element={<ChoosePlan />} />
        <Route path="/success" element={<Success/>}/>
      </Routes>
    </Router>
  );
}

export default App;
