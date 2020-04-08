import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_LANGUAGES, REMOVE_LANGUAGE } from "../actionTypes";

export const loadLanguages = languages => ({
  type: LOAD_LANGUAGES,
  languages
});

export const remove = language => ({
  type: REMOVE_LANGUAGE,
  language
});

export const fetchLanguages = () => (dispatch, getState) => {
  console.log("...fetching languages");
  let { currentUser } = getState();
  let id = currentUser.user.id;
  return apiCall("get", `/api/users/${id}/languages`)
    .then(res => {
      dispatch(loadLanguages(res));
    })
    .catch(err => {
      dispatch(addError(err.message));
    });
};

export const postNewLanguage = (language, totalTime) => (
  dispatch,
  getState
) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `api/users/${id}/languages`, {
    text: language,
    totalTime: totalTime
  })
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
};

export const removeLanguage = (userID, languageID) => {
  return dispatch => {
    return apiCall("delete", `api/users/${userID}/languages/${languageID}`)
      .then(res => dispatch(remove(res)))
      .then(fetchLanguages())
      .catch(err => dispatch(addError(err.message)));
  };
};

export const updateLanguageTime = (_id, combinedTime) => (
  dispatch,
  getState
) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("patch", `api/users/${id}/languages/${_id}`, {
    totalTime: combinedTime
  })
    .then({})
    .catch(err => dispatch(addError(err.message)));
};
