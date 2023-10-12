import "./App.css";


import { Routes, Route } from "react-router-dom";
import Present from "./components/Present";
import Absent from "./components/Absent";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Present />} />
        <Route path="/absent" element={<Absent />} />
      </Routes>
    </div>
  );
}

export default App;
