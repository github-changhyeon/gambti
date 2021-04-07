import { restApi, getConfig } from "./index";

function getGroupRoom(success, fail) {
  const token = localStorage.getItem("idToken");
  const config = getConfig(token);
  restApi()
    .get("​/rooms​/getGroupRoom", config ? config : null)
    .then(success)
    .catch(fail);
}

export { getGroupRoom };
