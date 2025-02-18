import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import UrlCard from "../components/UrlCard";
import UrlDetails from "../components/UrlDetails";
import "../styles/Account.css";
import { fetchUserById } from "../apis/userApis";
import { fetchUrls } from "../apis/urlApis";

function Account() {
  const [clickedUrl, setClickedUrl] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(() => sessionStorage.getItem("userId"));

  const [userUrls, setUserUrls] = useState([]);

  const handleUrlDeleted = () => {
    setClickedUrl(null);
  };

  useEffect(() => {
    if (!userId) {
      window.location.href = "/";
      return;
    }

    const getUser = async () => {
      try {
        const fetchedUser = await fetchUserById(userId);
        setUser(fetchedUser.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const getUrls = async () => {
      try {
        const fetchedUrls = await fetchUrls(userId);

        setUserUrls(fetchedUrls);
      } catch (error) {
        console.error("Error fetching urls:", error);
      }
    };

    getUser();
    getUrls();
  }, [userId, userUrls]);

  const handleClick = (url) => {
    setClickedUrl(url);
  };

  return (
    <div className="vh-100 w-100 pt-5">
      <Profile id={userId} />
      <div className="container mt-5 ">
        <h4 className="fw-bold">Your Shorten Links</h4>
        <div className="row mt-2">
          <div className="col-md-8 url-box">
            {userUrls.map((url) => {
              return (
                <UrlCard
                  url={url}
                  key={url._id}
                  onClick={() => handleClick(url)}
                />
              );
            })}
            <p className="text-center">no more data available...</p>
          </div>
          <div className="col-md-4">
            {clickedUrl && (
              <UrlDetails url={clickedUrl} onDelete={handleUrlDeleted} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
