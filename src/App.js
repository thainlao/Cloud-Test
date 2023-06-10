import React from "react";
import Mainbody from "./components/Mainbody";
import Create from "./components/Create";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainbody />} />
        <Route path="/create" element={<Create />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
      </Routes>
    </Router>
  );
}

export default App;

