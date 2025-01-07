import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerValidate } from "../../utils/validations/register";
import useShowToasts from "../../utils/hooks/showToast";
import { register } from "../../utils/api/user";

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useShowToasts();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validateUser = registerValidate(user);

    if (validateUser.length > 0) {
      showToast(validateUser[0].message);
      setLoading(false);
    } else {
      try {
        const res = await register(user);
        if (res.success) {
          navigate("/profileSetup", {
            state: { username: res.username, name: user.name },
          });
        } else {
          showToast(res.message);
        }
      } catch (error) {
        console.error(error);
        showToast("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className=" h-screen flex justify-between">
      <div className="px-8 py-5 flex-1 flex items-center justify-center">
        <div className="px-8 py-5 md:shadow-2xl shadow-black  rounded-lg md:max-w-sm w-full">
          <p className="form-heading">Sign up to WordFlow</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="input"
                value={user.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="input"
                value={user.email}
                onChange={handleChange}
                placeholder="johndoe@gmail.com"
              />
            </div>

            <div className="mb-5 relative">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="input"
                value={user.password}
                onChange={handleChange}
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
            </div>

            <div className="mb-5 relative">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                className="input"
                value={user.confirmPassword}
                onChange={handleChange}
                placeholder="Ab123456@"
              />
              <div
                className="eye-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Please wait..." : "Register"}
              </button>
            </div>
          </form>

          <div>
            <p className="text-center pt-5">
              Already have an account?{" "}
              <Link to="/login">
                <span className="signIn-signUp">Sign In</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
