import React from "react";
import "../styles/languages-style.css";

const LanguageItem = ({ text, totalTime, removeLanguage, reloadLanguages }) => {
  const timeMins = Math.round(totalTime / 3600000);

  const removeReload = async () => {
    await removeLanguage();
    reloadLanguages();
  };

  return (
    <div className="language-item">
      <p className="language-title">{text}</p>
      {timeMins >= 1 && <h1>{timeMins}</h1>}
      {timeMins >= 1 && timeMins < 2 && <p>hour</p>}
      {timeMins >= 2 && <p>hours</p>}
      {timeMins < 1 && <p>less than an hour, keep coding!</p>}

      <button onClick={removeReload}>Delete</button>
    </div>
  );
};

export default LanguageItem;
