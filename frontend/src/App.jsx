import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import Login from "./components/Login";
import ProfileSetup from "./components/ProfileSetup";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="bg-white text-black">
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
