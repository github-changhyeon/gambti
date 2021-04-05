import { React, useState, useEffect } from "react";
import axios from "axios";

export default function DetailNews() {
  const [items, setItems] = useState(new Array());

  useEffect(() => {
    axios
      .get(
        `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${70}&count=${30}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div></div>;
}
