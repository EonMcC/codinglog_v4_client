import currentUser from "./currentUser";
import { combineReducers } from "redux";
import errors from "./errors";
import languages from "./languages";
import timerTime from "./timer";
import theme from "./theme";

const rootReducer = combineReducers({
  currentUser,
  languages,
  errors,
  timerTime,
  theme
});

export default rootReducer;
