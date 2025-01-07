import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import Login from "./components/Login";
import ProfileSetup from "./components/ProfileSetup";

const App = () => {
  return (
    <div className="bg-white text-black">
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
      </Routes>
    </div>
  );
};

export default App;
