import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Timer from "./Timer";
import "../styles/homepage-style.css";

const Homepage = ({ currentUser, history }) => {
  if (!currentUser.isAuthenticated) {
    return (
      <div className="homepage logged-out">
        <h2>Welcome to Codinglog</h2>
        <h3>{currentUser.username}</h3>
        <div className="logged-out-links">
          <Link to="/signin">Sign-in</Link>
          <Link to="/signup">Sign-up</Link>
        </div>
        <p className="disclaimer">
          ### Please note that Codinglog v4 is running on a free Heroku server
          where the dynos go to sleep after 30 minutes of inactivity. The dynos
          take a few seconds to start up when called on which will result in a
          slower than normal user experience - please be patient. ###
        </p>
      </div>
    );
  }
  return (
    <div className="homepage logged-in">
      <h2>Welcome, {currentUser.user.username}</h2>
      <div className="big-btn-wrapper">
        <Timer history={history} />
        <Link to="/manual-list">Add Time</Link>
        <Link to="/languages">Show Languages</Link>
        <Link to="/languageform">Add New Language</Link>
      </div>
      <p className="disclaimer">
        ### Please note that Codinglog v4 is running on a free Heroku server
        where the dynos go to sleep after 30 minutes of inactivity. The dynos
        take a few seconds to start up when called on which will result in a
        slower than normal user experience - please be patient. ###
      </p>
    </div>
  );
};

export default Homepage;
