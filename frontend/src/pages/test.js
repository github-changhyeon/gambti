import React from 'react';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import CloseButton from 'src/components/CloseButton/CloseButton';
import GameCard from 'src/components/GameCard/GameCard';
import GenreCard from 'src/components/GenreCard/GenreCard';
import Hashtag from 'src/components/Hashtag/Hashtag';
import MediumProfile from 'src/components/MediumProfile/MediumProfile';
import SmallProfile from 'src/components/SmallProfile/SmallProfile';
import UserCard from 'src/components/UserCard/UserCard';

export default function Test() {
  return (
    <div>
      <h1>Hello Test</h1>
      <AvatarComp size="small" textvalue="hi"></AvatarComp>
      <ButtonComp size="small" textvalue="hi"></ButtonComp>
      <CloseButton />
      <GameCard />
      <GenreCard
        imagePath="https://s.gjcdn.net/assets/action.7447804b.png"
        genreName="name"
        isClicked={true}
      />
      <Hashtag />
      <MediumProfile />
      <SmallProfile />
      <UserCard />
    </div>
  );
}
