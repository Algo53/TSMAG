import React, { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { updateUserRoute, userInfoReset } from "../redux/slices/userInfoSlice";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state: RootState) => state.userInfo.userInfo);

  const [user, setUser] = useState<IUser | null>(null)
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<UpdateUserParams>({
    name: "",
    email: "",
    currentPassword: null,
    newPassword: null,
    avatar: "",
  });

  const handleProfileUpdate = () => {
    dispatch(updateUserRoute(updatedUser));
    setIsEditingProfile(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [event.target.name]: event.target.value })
  }

  const handleLogout = () => {
    dispatch(userInfoReset());
    navigate('/login')
  };

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
      setUpdatedUser((details) => ({
        ...details,
        name: userInfo.name,
        email: userInfo.email,
        avatar: userInfo.avatar,
      }));
    }
  }, [userInfo])

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">
        {/* Profile Image */}
        <div className="text-center mb-6">
          {userInfo?.avatar ? (
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-gray-300"
            />
          ) : (
            <i className="fa-solid fa-user fa-2xl" />
          )}
        </div>

        {/* Display or Edit Profile */}
        {!isEditingProfile ? (
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {user?.name || "User"}
            </h1>
            <p className="text-lg text-gray-600">{user?.email}</p>
            <button
              onClick={() => setIsEditingProfile(true)}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="mt-4 ml-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          // Profile Editing Form
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">Edit Profile</h1>

            {/* Profile Photo */}
            <div>
              <label htmlFor="photo" className="block text-gray-700">
                Profile Image URL
              </label>
              <input
                type="text"
                id="photo"
                name="avatar"
                value={updatedUser.avatar || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="name"
                id="name"
                value={updatedUser?.name || ""}
                onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={updatedUser?.email || ""}
                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                disabled
              />
            </div>

            {/* Password Edit Option */}
            <button
              onClick={() => setIsEditingPassword(!isEditingPassword)}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isEditingPassword ? "Cancel Password Change" : "Change Password"}
            </button>

            {isEditingPassword && (
              <div className="space-y-4 mt-4">
                <div>
                  <label htmlFor="oldPassword" className="block text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Save Changes */}
            <button
              onClick={handleProfileUpdate}
              className="w-full py-3 mt-6 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save Profile Changes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage;
