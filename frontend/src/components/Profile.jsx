import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { fetchUserById, updateUserInfo } from "../apis/userApis";
import { ToastContainer, toast } from "react-toastify";

function Profile({ id }) {
  const [isediting, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleEditing = () => {
    setIsEditing(!isediting);
  };

  const handleSave = async () => {
    try {
      const response = await updateUserInfo(id, user.email, user.password);
      if (response.data.success) {
        setIsEditing(false);
        toast.success(response.data.success, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await fetchUserById(id);
        setUser(fetchedUser.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
  }, [id]);

  return (
    <div className="container mt-5">
      <h4 className="fw-bold text-center text-md-start">Your Account</h4>
      <div className="d-flex flex-column flex-md-row justify-content-md-start align-items-center align-items-md-end gap-3">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Box
          component="form"
          sx={{
            marginTop: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <TextField
            disabled={!isediting}
            id="email"
            label="Email"
            value={user.email}
            onChange={handleChange}
          />
          <TextField
            disabled={!isediting}
            id="password"
            label="Set New Password"
            type="password"
            onChange={handleChange}
          />
        </Box>

        <div className="mb-2">
          {isediting ? (
            <div className="d-flex gap-2">
              <div
                className="btn btn-success rounded-5 px-5 py-2"
                onClick={handleSave} // Save data on click
              >
                Save
              </div>
              <div
                className="btn btn-dark rounded-5 px-5 py-2"
                onClick={handleEditing} // Cancel editing
              >
                Cancel
              </div>
            </div>
          ) : (
            <div
              className="btn btn-dark rounded-5 px-5 py-2"
              onClick={handleEditing} // Toggle edit mode
            >
              Edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
