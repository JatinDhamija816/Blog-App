import Welcome from "./components/Welcome";
import Register from "./components/Register";

import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div className="bg-white text-black">
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
