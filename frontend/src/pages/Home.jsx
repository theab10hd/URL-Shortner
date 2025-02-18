import React, { useState } from "react";
import "../styles/Home.css";
import LaunchIcon from "@mui/icons-material/Launch";
import { createUrl } from "../apis/urlApis";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const [copied, setCopied] = useState(false);
  const [isUser, setIsUser] = useState(
    sessionStorage.getItem("userId") ? true : false
  );

  const [url, setUrl] = useState({
    destination: "",
    userId: isUser ? sessionStorage.getItem("userId") : null,
  });

  const [shortenUrl, setShortenUrl] = useState("");

  const handleCreateShortLink = async () => {
    try {
      const response = await createUrl(url);
      if (response.shortenUrl) {
        setShortenUrl(response.shortenUrl);
      }
    } catch (error) {
      console.log("Error in creating short link", error.message);
    }
  };

  const handleDestination = (e) => {
    const { name, value } = e.target;
    setUrl((prevUrl) => ({
      ...prevUrl,
      [name]: value,
    }));
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shortenUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.info("Link Coppied", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
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
      <div className="conatiner text-center">
        <h3 className="fw-bold">Welcome to URL Shortener</h3>
        <p>Start by shortening link!</p>
        <div className="input-group mb-3 ">
          <input
            type="text"
            className="form-control rounded-start-5 px-3"
            placeholder="Paste your link here"
            onChange={handleDestination}
            value={url.destination}
            name="destination"
          />
          <span
            className="btn btn-dark rounded-end-5"
            onClick={handleCreateShortLink}
          >
            Shorten
          </span>
        </div>
        {shortenUrl && (
          <>
            <p className="text-secondary mb-1">Your Shorten Link</p>
            <div className="d-flex gap-1 justify-content-center">
              <div
                className="btn btn-outline-dark rounded-5 px-4 "
                onClick={handleCopy}
              >
                {shortenUrl}
              </div>
              <a
                target="_blank"
                href={shortenUrl}
                className="btn btn-dark rounded-5"
              >
                <LaunchIcon />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
