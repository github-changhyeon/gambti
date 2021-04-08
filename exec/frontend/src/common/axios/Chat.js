import { restApi, getConfig } from "./index";

function getGroupRoom(params, success, fail) {
  const token = localStorage.getItem("idToken");
  const config = getConfig(token);
  //?type=Group&maxNumber=4&gameName=${params.appName}&gameId=${params.gameId}
  restApi()
    .post(
      `/rooms/getGroupRoom`,
      {
        type: "Group",
        maxNumber: "4",
        gameName: params.appName,
        gameId: params.gameId,
      },
      config ? config : null
    )
    .then(success)
    .catch(fail);
}

export { getGroupRoom };
