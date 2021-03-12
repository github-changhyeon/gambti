import React from 'react';
import styles from './index.module.css';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';


export default function ForgotSent() {
  const [size, setSize] = React.useState('small')
  const [textvalue, setTextvalue] = React.useState('Hi')

  return (
    <div>
      <h1>Hello ForgotSent</h1>
      <AvatarComp size={size} textvalue={textvalue}></AvatarComp>
    </div >
  );
}
