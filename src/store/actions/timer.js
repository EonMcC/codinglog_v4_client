import { apiCall } from "../../services/api";
import { ADD_TIMER_TIME } from "../actionTypes";

export const getTime = () => (dipatch, getState) => {
  let { currentUser } = getState();
  let id = currentUser.user.id;
  return apiCall("get", `api/users/${id}/timer`);
};

export const startTimer = date => (dispatch, getState) => {
  let { currentUser } = getState();
  let id = currentUser.user.id;
  return apiCall("patch", `api/users/${id}/timer`, { date }).then(res =>
    console.log(res)
  );
};

export const addTimerTime = time => ({
  type: ADD_TIMER_TIME,
  time
});
