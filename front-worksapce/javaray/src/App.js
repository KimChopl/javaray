import "./App.css";
import Shipping from "./shipping/Shipping";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="shipping" element={<Shipping />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
