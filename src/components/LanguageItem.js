import React from "react";
import "../styles/languages-style.css";
import { Link } from "react-router-dom";

const LanguageItem = ({ text, totalTime, removeLanguage, reloadLanguages }) => {
  const timeMins = Math.round(totalTime / 3600000);

  const removeReload = async () => {
    let result = window.confirm(
      "Warning! You will lose all time recorded for this language. Are you sure want to delete?"
    );
    if (result) {
      await removeLanguage();
      reloadLanguages();
    }
  };

  return (
    <div className="language-item">
      <p className="language-title">{text}</p>
      {timeMins >= 1 && <h1>{timeMins}</h1>}
      {timeMins >= 1 && timeMins < 2 && <p>hour</p>}
      {timeMins >= 2 && <p>hours</p>}
      {timeMins < 1 && <p>less than an hour, keep coding!</p>}
      <hr className="language-split"></hr>
      <div className="language-button-container">
        <button>
          <Link to="/manual-list">Add Time</Link>
        </button>
        <button onClick={removeReload}>Delete Language</button>
      </div>
    </div>
  );
};

export default LanguageItem;
