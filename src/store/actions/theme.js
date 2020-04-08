import { apiCall } from "../../services/api";
import { SET_THEME } from "../actionTypes";

export const getTheme = () => (dipatch, getState) => {
  console.log("Getting Theme");
  let { currentUser } = getState();
  let userID = currentUser.user.id;
  return apiCall("get", `api/users/${userID}`);
};

export const patchTheme = theme => (dispatch, getState) => {
  let { currentUser } = getState();
  let userID = currentUser.user.id;
  return apiCall("patch", `api/users/${userID}/theme`, { theme }).then(res =>
    dispatch(setTheme(res))
  );
};

export const setTheme = theme => ({
  type: SET_THEME,
  theme
});
