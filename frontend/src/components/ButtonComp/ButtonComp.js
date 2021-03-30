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
  // 친구 추가
  if (size === "xsmall") {
    return (
      <div>
        <Button
          className={styles.xsmall}
          variant="contained"
          style={{ backgroundColor: `${color}` }}
        >
          {textvalue}
        </Button>
      </div>
    );
  }
  // logout, editProfile(save, connect)
  else if (size === "small") {
    return (
      <div>
        <Button
          className={styles.small}
          variant="contained"
          style={{ backgroundColor: `${color}` }}
        >
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
            style={{
              border: "2px solid " + color,
              backgroundColor: "transparent",
              color: "white",
            }}
            variant="contained"
            onClick={onClick}
            bold
          >
            {textvalue}
          </Button>
        ) : (
          <Button
            className={styles.medium}
            style={{
              backgroundColor: `${color}`,
            }}
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
  } else if (size === "bold") {
    return (
      <div>
        <Button
          className={styles.bold}
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
