import { SET_THEME } from "../actionTypes";

const setTheme = (state = 0, action) => {
  switch (action.type) {
    case SET_THEME:
      return action.theme;
    default:
      return state;
  }
};

export default setTheme;
