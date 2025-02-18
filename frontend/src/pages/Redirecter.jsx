import React, { useEffect, useState } from "react";
import { gotoUrl } from "../apis/urlApis";
import PnF from "./PnF";

function Redirecter() {
  const [shortenId, setShortenId] = useState(
    window.location.pathname.replace("/", "")
  );

  if (shortenId === "") {
    window.location.href = "/home";
  }

  const [destination, setDestination] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await gotoUrl(shortenId);
        setDestination(response.destination);
      } catch (error) {
        console.log("Error in Redirecter", error.message);
      }
    };

    fetchData();
  }, []);

  return destination ? (window.location.href = destination) : <PnF />;
}

export default Redirecter;
