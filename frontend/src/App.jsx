import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Analyze from "./pages/Analyze";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/faq" element={<FAQ />} />

          <Route path="/analyze" element={<Analyze />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;