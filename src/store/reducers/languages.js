import { LOAD_LANGUAGES, REMOVE_LANGUAGE } from "../actionTypes";

const language = (state = [], action) => {
  switch (action.type) {
    case LOAD_LANGUAGES:
      return [...action.languages];
    case REMOVE_LANGUAGE:
      return state.filter(lang => {
        return lang._id !== action.id;
      });
    default:
      return state;
  }
};

export default language;
