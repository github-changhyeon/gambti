import { React, useState } from "react";
import styles from "./CloseButton.module.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function CloseButton({ onClick }) {
  const [color, setColor] = useState("#b0b0b0");

  const setColorGreen = () => {
    setColor("#ccff00");
  };
  const setColorWhite = () => {
    setColor("#b0b0b0");
  };

  return (
    <HighlightOffIcon
      className={styles.closeButton}
      style={{ color: color }}
      onClick={onClick}
      onMouseOver={() => {
        setColorGreen();
      }}
      onMouseOut={() => {
        setColorWhite();
      }}
    ></HighlightOffIcon>
  );
}
