import { FaCamera, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useShowToasts from "../../utils/hooks/showToast";
import { profileSetup } from "../../utils/api/user";

const ProfileSetup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useShowToasts();

  const { username = "Guest", name = "User" } = location.state || {};
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (allowedTypes.includes(file.type)) {
        setAvatar(file);
      } else {
        showToast("Please select a valid image file (jpg, jpeg, png).");
        setAvatar(null);
      }
    }
  };

  const handleBioChange = (e) => {
    const inputBio = e.target.value;
    if (inputBio.length <= 150) {
      setBio(inputBio);
    }
  };

  const handleSubmit = async () => {
    if (!avatar) {
      showToast("Please upload an avatar.");
      return;
    }
    if (!bio.trim()) {
      showToast("Please add bio.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("bio", bio);

    try {
      setIsLoading(true);
      const res = await profileSetup(formData);
      if (res.success) {
        navigate("/homePage");
      } else {
        showToast(res.message);
      }
    } catch (error) {
      console.error(error);

      showToast("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const avatarPreview = avatar ? URL.createObjectURL(avatar) : "";

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  return (
    <div className="min-h-screen p-8">
      <p className="text-center font-mono italic text-2xl font-bold md:text-left">
        WordFlow
      </p>

      <div className="my-5 mx-auto max-w-screen-sm flex flex-col items-start">
        <div>
          <p className="text-xl font-bold md:text-2xl">
            Welcome, {name}! Let's create your profile
          </p>
          <p className="font-semibold">
            This is your username: {username.toUpperCase()}
          </p>
          <p>Let others get to know you better</p>
        </div>

        <div className="mt-10 w-full">
          <p className="label">Add an avatar</p>
          <div className="flex items-center mt-5">
            {avatar ? (
              <div className="relative">
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="rounded-full w-32 h-32 object-cover"
                />
                <button
                  onClick={handleRemoveAvatar}
                  className="absolute top-2 right-0 p-2 rounded-full transition"
                >
                  <FaTrash style={{ color: "#cf4e59" }} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="avatar"
                className="p-12 md:p-16 border border-dashed rounded-full w-fit cursor-pointer transition duration-300"
              >
                <FaCamera className="" />
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </label>
            )}
            {avatar && <p className="mt-2 ml-5">Selected: {avatar.name}</p>}
          </div>
        </div>

        <div className="my-10 w-full">
          <p className="label">Add Bio</p>
          <textarea
            placeholder="Tell us something about yourself"
            className="input"
            rows={2}
            value={bio}
            onChange={handleBioChange}
          />
          <p className="text-sm">{bio.length} / 150 characters</p>
          {bio.length >= 150 && (
            <p className="text-red-500 text-sm">
              You have reached the maximum character limit.
            </p>
          )}
        </div>

        <div className="flex justify-end w-full">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-md transition duration-300 shadow-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
