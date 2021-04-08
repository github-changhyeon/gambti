import { React, useEffect } from "react";
import styles from "../index.module.css";
import { usePalette } from "react-palette";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function DetailInfo({ propsMatch, propsGameInfo }) {
  const { data, loading, error } = usePalette(
    propsGameInfo.backgroundImagePath
  );

  return (
    <div>
      <div style={{ padding: "5px 0 10px 0" }}>
        <Typography className={styles.detail_right_info_title}>
          출시날짜
        </Typography>
        <Typography
          className={styles.detail_right_info_detail}
          style={{ color: data.lightVibrant }}
        >
          {propsGameInfo.releaseDate}
        </Typography>
      </div>
      <div style={{ padding: "10px 0 2px 0" }}>
        <Typography className={styles.detail_right_info_title}>
          개발자
        </Typography>
        <Typography
          className={styles.detail_right_info_detail}
          style={{ color: data.lightVibrant }}
        >
          {propsGameInfo.developer}
        </Typography>
      </div>
      <div style={{ padding: "2px 0 10px 0" }}>
        <Typography className={styles.detail_right_info_title}>
          배급사
        </Typography>
        <Typography
          className={styles.detail_right_info_detail}
          style={{ color: data.lightVibrant }}
        >
          {propsGameInfo.publisher}
        </Typography>
      </div>
      <div style={{ padding: "5px 0 0 0" }}>
        <Typography className={styles.detail_right_info_popular}>
          이 제품의 인기 태그
        </Typography>
        <div>
          {propsGameInfo.tags.map((tag, i) => {
            return (
              <Button
                key={i}
                className={styles.tag}
                style={{ backgroundColor: data.lightVibrant }}
              >
                {tag}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
