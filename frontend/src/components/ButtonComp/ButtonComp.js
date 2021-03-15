import React from 'react';
import styles from './ButtonComp.module.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function ButtonComp({ size, textvalue }) {

  const colorTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#CCFF00',
      },
      secondary: {
        main: '#ffffff',
      },
    },
  });
  const [myTheme, setMyTheme] = React.useState(colorTheme);
  // logout, editProfile(save, connect), 친구 추가 
  if (size === 'sm') {
    return (
      <ThemeProvider theme={myTheme}>
        <div>
          <Button className={styles.sm} variant="contained" color="primary">{textvalue}</Button>
        </div>
      </ThemeProvider>
    );
  }
  // GameCard, UserCard, MainButton
  else if (size === 'md') {
    return (
      <ThemeProvider theme={myTheme}>
        <div>
          <Button className={styles.md} variant="contained" color="secondary">{textvalue}</Button>
        </div>
      </ThemeProvider>
    );
  }
  // login, signup, Forgot, ForgotSent
  else if (size === 'lg') {
    return (
      <ThemeProvider theme={myTheme}>
        <div>
          <Button className={styles.lg} variant="contained" color="primary">{textvalue}</Button>
        </div>
      </ThemeProvider>
    );
  }
}

