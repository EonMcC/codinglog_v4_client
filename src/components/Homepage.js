import React from "react";
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
    </div>
  );
};

export default Homepage;
