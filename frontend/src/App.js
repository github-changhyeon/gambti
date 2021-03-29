import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import Header from "src/components/Header/Header";
import Nav from "src/components/Nav/Nav";
import Footer from "src/components/Footer/Footer";
import routerInfo from "src/constants/routerInfo";
import fire from "src/fire";
import { UserContext, UserProvider } from "src/Context/UserContext";
import { FirebaseProvider } from "src/Context/FirebaseContext";

import {
  Home,
  Login,
  Signup,
  CheckGambti,
  CheckInfo,
  EmailConfirm,
  Forgot,
  ForgotSent,
  GenreGames,
  Search,
  Detail,
  Profile,
  EditProfile,
  Test,
  NoAccess,
  Loading,
  NotFound,
  ActionUrlHandler,
  KiHyeonTest
} from "./pages";

const AppRouter = () => {
  const user = useContext(UserContext);
  const currentUser = fire.auth.currentUser;

  if (user.isLoggedIn === null) {
    return <Loading />;
  } else {
    // 로그인이 되어 있을 경우
    if (user.isLoggedIn) {
      // 이메일 인증이 되어 있을 경우
      if (user.emailVerified) {
        return <MainRouter />;
      }
      // 이메일 인증이 안되어 있을 경우
      else {
        return <EmailConfirmRouter />;
      }
    }
    // 로그인이 안되어 있을 경우
    else {
      return <NotLoginRouter />;
    }
  }
};

const NotLoginRouter = () => {
  return (
    <Router>
      <Header isLogin={false} />
      <Switch>
        <Route exact path={routerInfo.PAGE_URLS.HOME} component={Home} />
        <Route path={routerInfo.PAGE_URLS.LOGIN} component={Login} />
        <Route path={routerInfo.PAGE_URLS.SIGNUP} component={Signup} />
        <Route path={routerInfo.PAGE_URLS.CHECK_INFO} component={CheckInfo} />
        <Route
          path={routerInfo.PAGE_URLS.CHECK_GAMBTI}
          component={CheckGambti}
        />
        <Route exact path={routerInfo.PAGE_URLS.FORGOT} component={Forgot} />
        <Route path={routerInfo.PAGE_URLS.FORGOT_SENT} component={ForgotSent} />
        <Route path={routerInfo.PAGE_URLS.GAMES} component={GenreGames} />
        <Route path={routerInfo.PAGE_URLS.SEARCH} component={Search} />
        <Route path={routerInfo.PAGE_URLS.DETAIL} component={Detail} />
        <Route exact path={routerInfo.PAGE_URLS.PROFILE} component={Profile} />
        <Route path="/action-url-handler" component={ActionUrlHandler} />
        <Route path="/test" component={Test} />
        <Route exact path={routerInfo.PAGE_URLS.KIHYEON_TEST} component={KiHyeonTest} />
        <Route path="*" component={NoAccess} />
      </Switch>
      <Footer />
    </Router>
  );
};

const MainRouter = () => {
  const user = useContext(UserContext);
  return (
    <Router>
      <Header isLogin={true} />
      <Nav />
      <div style={{ paddingLeft: "64px" }}>
        <Switch>
          <Route exact path={routerInfo.PAGE_URLS.HOME} component={Home} />
          <Route path={routerInfo.PAGE_URLS.GAMES} component={GenreGames} />
          <Route path={routerInfo.PAGE_URLS.SEARCH} component={Search} />
          <Route path={routerInfo.PAGE_URLS.DETAIL} component={Detail} />
          <Route
            exact
            path={routerInfo.PAGE_URLS.PROFILE}
            component={Profile}
          />
          <Route
            path={routerInfo.PAGE_URLS.PROFILE_EDIT}
            component={EditProfile}
          />
          <Route path="/action-url-handler" component={ActionUrlHandler} />
          <Route path="/test" component={Test} />
          <Route path="*" component={NoAccess} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};
const EmailConfirmRouter = () => {
  return (
    <Router>
      <Header isLogin={true} />
      <Switch>
        <Route
          exact
          path={routerInfo.PAGE_URLS.EMAIL_CONFIRM}
          component={EmailConfirm}
        />
        <Route path="/action-url-handler" component={ActionUrlHandler} />
        <Route path="/test" component={Test} />
        <Route path="*" component={NoAccess} />
      </Switch>
      <Footer />
    </Router>
  );
};

function App() {
  return (
    <StylesProvider injectFirst>
      <FirebaseProvider>
        <UserProvider>
          <div className="App">
            <AppRouter />
          </div>
        </UserProvider>
      </FirebaseProvider>
    </StylesProvider>
  );
}

export default App;
