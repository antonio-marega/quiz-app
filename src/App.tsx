// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Frontend from "./FrontPage";

// Define the functional component with TypeScript
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Frontend />} />
      </Routes>
    </Router>
  );
};

export default App;
