import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
