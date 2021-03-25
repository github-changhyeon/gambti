import React from 'react';
import styles from './index.module.css';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';


export default function ForgotSent() {
  // AvatarComp textvalue
  const [avatarTextvalue, setAvatarTextvalue] = React.useState('Hi')
  // ButtonComp textvalue
  const [buttonTextvalue, setButtonTextvalue] = React.useState('Hi')

  return (
    <div>
      <h1>Hello ForgotSent</h1>
      {/* AvatarComp 사용할때 size랑 textvalue를 줘야해 */}
      <AvatarComp size='small' textvalue={avatarTextvalue}></AvatarComp>
      <ButtonComp size='small' textvalue={buttonTextvalue}></ButtonComp>
    </div >
  );
}
