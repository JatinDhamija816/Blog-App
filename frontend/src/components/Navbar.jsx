import { useState } from "react";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // const { user } = useAppContext();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  return (
    <div>
      <nav className="w-full z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="logo" onClick={() => navigate("/home")}>
            WordFlow
          </div>

          {/* desktop view */}
          <div className="hidden md:flex items-center space-x-6 cursor-pointer transition">
            <p
              className="font-semibold px-2"
              onClick={() => navigate("/write-blog")}
            >
              + Write
            </p>

            <div className="relative">
              <input type="text" placeholder="Search..." className="input" />
              <FaSearch className="absolute right-3 top-3" />
            </div>

            <div
              className="relative pl-5 cursor-pointer"
              onClick={() => setProfileModal(!profileModal)}
            >
              <img
                src={user?.avatar || "/assets/default_User.jpg"}
                alt={user?.username || "Profile"}
                className="w-10 h-10 rounded-full border-2 hover:ring-2 transition"
              />
            </div>
          </div>

          {/* mobile view */}
          <div className="md:hidden flex">
            <div
              className=" items-center px-5 focus:outline-none"
              onClick={() => setSearchBar(!searchBar)}
            >
              <FaSearch size={24} />
            </div>

            <div
              className="md:hidden flex items-center focus:outline-none"
              onClick={handleToggleMenu}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>
          </div>
        </div>

        {/* desktop profile modal */}
        {profileModal && (
          <div className="absolute right-5 top-15 bg-white shadow-md shadow-black rounded-lg w-48">
            <ul>
              <Link to={"/my-profile"}>
                <li className="desktop-profile-modal rounded-t-md">
                  My Profile
                </li>
              </Link>
              <Link to={"/user-blogs"}>
                <li className="desktop-profile-modal">My Posts</li>
              </Link>
              <Link to={"/change-password"}>
                <li className="desktop-profile-modal">Change Password</li>
              </Link>
              <li
                onClick={handleSignOut}
                className="hover:bg-red-500 desktop-profile-modal rounded-b-md"
              >
                Sign Out
              </li>
            </ul>
          </div>
        )}

        {/* mobile desktop modal */}
        {isOpen && (
          <div className="md:hidden px-6 py-4 space-y-4 shadow-lg items-center justify-center flex-col">
            <p
              className="mobile-profile-modal"
              onClick={() => {
                navigate("/write-blog");
                setIsOpen(false);
              }}
            >
              + Write
            </p>

            <p
              onClick={() => {
                navigate("/my-profile");
                setIsOpen(false);
              }}
              className="mobile-profile-modal"
            >
              My Profile
            </p>

            <p
              onClick={() => {
                navigate("/user-blogs");
                setIsOpen(false);
              }}
              className="mobile-profile-modal"
            >
              My Posts
            </p>

            <p
              onClick={() => {
                navigate("/change-password");
                setIsOpen(false);
              }}
              className="mobile-profile-modal"
            >
              Change Password
            </p>

            <p
              onClick={handleSignOut}
              className="mobile-profile-modal hover:bg-red-500"
            >
              Sign Out
            </p>
          </div>
        )}

        {/* mobile-search-bar */}
        {searchBar && (
          <div className="relative">
            <input type="text" placeholder="Search..." className="input" />
            <FaSearch className="absolute right-3 top-3" />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
