import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col  px-10">
      <p className="text-3xl font-bold text-center ">Welcome to WordFlow</p>
      <p className="text-xl text-center">
        Your space to write, read, and discover amazing stories.
      </p>

      <Link to="/register">
        <button className="bg-blue-600 py-2 rounded-3xl px-5 text-white hover:bg-blue-700 my-5 transition duration-300">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Welcome;
