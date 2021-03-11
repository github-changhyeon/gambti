import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  axios
    .get("/ISteamApps/GetAppList/v2")
    .then((Response) => {
      console.log(Response.data);
    })
    .catch((Error) => {
      console.log(Error);
    });

  axios
    .post(
      "/IVideoService/GetVideoBookmarks/v1/?key=22A1030E33EBE73E25C415353E77E2BB",
      {
        params: {
          appids: "578080",
        },
      }
    )
    .then((Response) => {
      console.log(Response.data);
    })
    .catch((Error) => {
      console.log(Error);
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Learn React
      </header>
    </div>
  );
}

export default App;
