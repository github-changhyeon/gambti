import { React, useState, useEffect } from "react";
import YoutubeSearch from "youtube-search";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

export default function DetailYoutube({ propsMatch, propsGameInfo }) {
  const opts = {
    maxResults: 10,
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    statistics: true,
  };

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&q=${"닥터프렌즈"}&safeSearch=none&key=${
          process.env.REACT_APP_YOUTUBE_API_KEY
        }`
      )
      .then((response) => {
        console.log("일번", response.data);
        console.log(response.data["items"]);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${"OgasIxcG5SE"}&maxResults=10&key=${
          process.env.REACT_APP_YOUTUBE_API_KEY
        }`
      )
      .then((response) => {
        console.log("이번", response.data);
        console.log("비디오", response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Card>
        <div>
          <CardContent>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div></div>
        </div>
        <CardMedia
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card>
        <div>
          <CardContent>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div></div>
        </div>
        <CardMedia
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card>
        <div>
          <CardContent>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div></div>
        </div>
        <CardMedia
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card>
        <div>
          <CardContent>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div></div>
        </div>
        <CardMedia
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card>
        <div>
          <CardContent>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div></div>
        </div>
        <CardMedia
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card>
        <div>
          <CardContent>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div></div>
        </div>
        <CardMedia
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card>
        <div>
          <CardContent>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div></div>
        </div>
        <CardMedia
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card>
        <div>
          <CardContent>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div></div>
        </div>
        <CardMedia
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card>
        <div>
          <CardContent>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div></div>
        </div>
        <CardMedia
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card>
        <div>
          <CardContent>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div></div>
        </div>
        <CardMedia
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
    </div>
  );
}
