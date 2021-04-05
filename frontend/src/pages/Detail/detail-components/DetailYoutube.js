import { React, useState, useEffect } from "react";

import YoutubeCards from "src/pages/Detail/detail-components/YoutubeCards";

export default function DetailYoutube({ propsMatch, propsGameInfo }) {
  useEffect(() => {}, []);

  return (
    <div>
      <YoutubeCards propsAppName={propsGameInfo.appName}></YoutubeCards>
    </div>
  );
}
