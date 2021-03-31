import React from "react";
import AvatarComp from "src/components/AvatarComp/AvatarComp";
import ButtonComp from "src/components/ButtonComp/ButtonComp";
import CloseButton from "src/components/CloseButton/CloseButton";
import GameCard from "src/components/GameCard/GameCard";
import GenreCard from "src/components/GenreCard/GenreCard";
import Hashtag from "src/components/Hashtag/Hashtag";
import MediumProfile from "src/components/MediumProfile/MediumProfile";
import SmallProfile from "src/components/SmallProfile/SmallProfile";
import UserCard from "src/components/UserCard/UserCard";
import GenreList from "src/components/GenreList/GenreList";
import InfiniteScrollCard from "src/components/InfiniteScrollCard/InfiniteScrollCard";

export default function Test() {
  const gameInfo1 = {
    appName: "title",
    isJoined: false,
    isOwned: true,
    image: {
      logoImage: {
        id: 1,
        path:
          "https://m.gjcdn.net/community-header/950/18067-crop0_296_1920_776-npqpqk9f-v4.webp",
      },
      backgroundImage: {
        id: 1,
        path:
          "https://m.gjcdn.net/community-header/950/18067-crop0_296_1920_776-npqpqk9f-v4.webp",
      },
    },
    suitedRate: 67.7,
    totalJoin: 123456,
  };

  const gameInfo2 = {
    appName: "title",
    isJoined: false,
    isOwned: true,
    image: {
      logoImage: {
        id: 1,
        path:
          "https://m.gjcdn.net/community-header/950/18067-crop0_296_1920_776-npqpqk9f-v4.webp",
      },
      backgroundImage: {
        id: 1,
        path:
          "https://m.gjcdn.net/community-header/950/18067-crop0_296_1920_776-npqpqk9f-v4.webp",
      },
    },
    suitedRate: 77.7,
    totalJoin: 123456,
  };

  return (
    <div>
      <h1>Hello Test</h1>
      <AvatarComp size="small" textvalue="hi"></AvatarComp>
      <ButtonComp size="small" textvalue="hi"></ButtonComp>
      <CloseButton color="white" />
      <div style={{ height: 283, width: 238 }}>
        <GameCard isLogin={true} gameInfo={gameInfo1} />
      </div>
      <br />
      <div style={{ height: 283, width: 238 }}>
        <GameCard isLogin={true} gameInfo={gameInfo2} />
      </div>
      <br />
      <GenreCard
        imagePath="https://s.gjcdn.net/assets/action.7447804b.png"
        genreName="name"
      />

      <Hashtag value="게임태그" color="#4ae0e0" />
      <Hashtag value="멀티미디어" color="#4ae0e0" />

      <MediumProfile propsUser={{ nickname: "aa", email: "bb" }} />
      <SmallProfile />
      <UserCard />
      <GenreList propsOrder="all"></GenreList>
      {/* <InfiniteScrollCard /> */}
    </div>
  );
}
