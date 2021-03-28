import { React } from "react";
import Button from "@material-ui/core/Button";

export default function FilterOrder() {
  return (
    <div
      style={{
        boxSizing: "border-box",
        borderBottom: "2px solid #666666",
        height: "32px",
      }}
    >
      <Button
        variant="outlined"
        style={{
          height: "32px",
          border: "2px solid #666666",
          color: "white",
          borderRadius: "8px 8px 0px 0px",
        }}
      >
        a
      </Button>
      <Button
        variant="outlined"
        style={{
          height: "32px",
          border: "2px solid #666666",
          color: "white",
          borderRadius: "8px 8px 0px 0px",
        }}
      >
        a
      </Button>
      <Button
        variant="outlined"
        style={{
          height: "32px",
          border: "2px solid #666666",
          color: "white",
          borderRadius: "8px 8px 0px 0px",
        }}
      >
        a
      </Button>
    </div>
  );
}
