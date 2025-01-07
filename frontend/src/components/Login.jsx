import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useShowToasts from "../../utils/hooks/showToast";
import { login } from "../../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useShowToasts();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(identifier, password);
      if (res.success) {
        navigate("/homePage");
      } else {
        showToast(res.message);
      }
    } catch (error) {
      console.error(error);
      showToast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-between">
      <div className="px-8 py-10 flex-1 flex items-center justify-center">
        <div className="px-8 py-10 md:shadow-2xl shadow-black  rounded-lg md:max-w-sm w-full">
          <p className="form-heading">Sign in to WordFlow</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="identifier" className="label">
                Email or Username
              </label>
              <input
                type="text"
                placeholder="Email or Username"
                required
                className="input"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div className="mb-5 relative">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ab123456@"
              />
              <div
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </div>
              <Link to={"/verifyEmail"}>
                <p className="signIn-signUp text-right mt-2">
                  Forgot Password?
                </p>
              </Link>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Please wait.." : "Login"}
              </button>
            </div>
          </form>
          <div>
            <p className="text-center pt-5">
              Don't have an account?{" "}
              <Link to="/register">
                <span className="signIn-signUp">Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
