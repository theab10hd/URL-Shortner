import React, { useEffect, useState } from "react";
import "../styles/Auth.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { loginUser, signupUser } from "../apis/userApis";
import { ToastContainer, toast } from "react-toastify";

function Auth({ login }) {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [errorText, setErrorText] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const response = await signupUser(user);
      if (response.error) {
        setErrorText(response.error);
      }

      if (response.success) {
        sessionStorage.setItem("userId", response.userId);
        toast.success(response.success, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.href = "/home";
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(user);
      if (response.error) {
        setErrorText(response.error);
      }

      if (response.success) {
        sessionStorage.setItem("userId", response.userId);
        toast.success(response.success, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.href = "/home";
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorText("");
    }, 3000);
  }, [errorText]);

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
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
      <div className="auth-box bg-white shadow-sm">
        <div className="container">
          <div className="px-2 py-5">
            {login ? (
              <div className="text-center">
                <p className="p-0 m-0 text-uppercase">Welcome back,</p>
                <h3 className="fw-bold p-0">Login to Your Account.</h3>
              </div>
            ) : (
              <div className="text-center">
                <p className="p-0 m-0 text-uppercase">New Here?</p>
                <h3 className="fw-bold p-0">Create a New Account.</h3>
              </div>
            )}

            <div className="d-flex justify-content-center align-items-center gap-2 flex-column">
              <Box
                component="form"
                sx={{
                  marginTop: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                  "& label.Mui-focused": { color: "black" },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": { borderColor: "black" },
                    "&:hover fieldset": { borderColor: "gray" },
                  },
                  width: "80%",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Your Email"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  error={error}
                  helperText={helperText}
                />
                <TextField
                  id="outlined-password-input"
                  label="Secure Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  fullWidth
                  error={error}
                  helperText={helperText}
                />
                <p className="text-danger m-0">{errorText}</p>
                {login ? (
                  <div
                    className="btn btn-dark rounded-5 px-5 py-2"
                    onClick={handleLogin}
                  >
                    Login
                  </div>
                ) : (
                  <div
                    className="btn btn-dark rounded-5 px-5 py-2"
                    onClick={handleRegister}
                  >
                    Sign Up
                  </div>
                )}
              </Box>
              {login ? (
                <p className="mt-2">
                  don't have a account?{" "}
                  <Link className="text-decoration-none" to="/signup">
                    Register
                  </Link>
                </p>
              ) : (
                <p className="mt-2">
                  already have a account?{" "}
                  <Link className="text-decoration-none" to="/login">
                    Login
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
