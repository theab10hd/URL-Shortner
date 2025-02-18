import React from "react";

function UrlCard({ url, onClick }) {
  return (
    <div
      className="w-100 bg-white rounded-2 p-3 shadow-sm my-2"
      onClick={onClick}
    >
      <h5>{url.title}</h5>
      <div className="d-flex justify-content-between">
        <p className="m-0 text-secondary">{url.shortenUrl}</p>
        <p className="m-0 text-secondary">
          {new Date(url.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default UrlCard;
