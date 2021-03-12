import React from 'react';
import styles from './index.module.css';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';


export default function ForgotSent() {
  // AvatarComp 사이즈, textvalue
  const [asize, setAsize] = React.useState('small')
  const [atextvalue, setAtextvalue] = React.useState('Hi')
  // ButtonComp 사이즈, textvalue
  const [bsize, setBsize] = React.useState('sm')
  const [btextvalue, setBtextvalue] = React.useState('Hi')

  return (
    <div>
      <h1>Hello ForgotSent</h1>
      {/* AvatarComp 사용할때 size랑 textvalue를 줘야해 */}
      {/* <AvatarComp size={asize} textvalue={atextvalue}></AvatarComp> */}
      <ButtonComp size={bsize} textvalue={btextvalue}></ButtonComp>
    </div >
  );
}
