import React from "react";
import styles from "./ButtonComp.module.css";
import Button from "@material-ui/core/Button";

export default function ButtonComp({
  size,
  textvalue,
  color,
  onClick,
  joined,
}) {
  // logout, editProfile(save, connect), 친구 추가
  if (size === "small") {
    return (
      <div>
        <Button className={styles.small} variant="contained">
          {textvalue}
        </Button>
      </div>
    );
  }
  // GameCard, UserCard, MainButton
  else if (size === "medium") {
    return (
      <div>
        {joined ? (
          <Button
            className={styles.medium}
            style={{ backgroundColor: "#00ffcc" }}
            variant="contained"
            onClick={onClick}
          >
            {textvalue}
          </Button>
        ) : (
          <Button
            className={styles.medium}
            variant="contained"
            onClick={onClick}
          >
            {textvalue}
          </Button>
        )}
      </div>
    );
  }
  // login, signup, Forgot, ForgotSent
  else if (size === "large") {
    return (
      <div>
        <Button
          className={styles.large}
          style={{ backgroundColor: `${color}` }}
          variant="contained"
          onClick={onClick}
        >
          {textvalue}
        </Button>
      </div>
    );
  } else if (size === "xlarge") {
    return (
      <div>
        <Button
          className={styles.xlarge}
          style={{ backgroundColor: `${color}` }}
          variant="contained"
          onClick={onClick}
        >
          {textvalue}
        </Button>
      </div>
    );
  }
}
