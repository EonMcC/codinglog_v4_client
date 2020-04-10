import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout, deleteAccount } from "../store/actions/auth";
import { patchTheme, getTheme } from "../store/actions/theme";
import { Link } from "react-router-dom";
import "../styles/navbar-style.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainColor: "",
    };
  }

  componentDidMount = async () => {
    this.props.getTheme().then((res) => {
      this.setState({
        mainColor: res.theme,
      });
      this.setTheme();
    });
  };

  logout = (event) => {
    event.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  };

  setTheme = () => {
    document.body.style.setProperty("--main", this.state.mainColor);
  };

  changeTheme = (event) => {
    let theme = event.target.value;
    document.body.style.setProperty("--main", theme);
    this.setState({ mainColor: theme });
    this.props.patchTheme(theme);
  };

  handleClickDelete = () => {
    let result = window.confirm(
      "Warning! Account deletion is permanent. Are you sure want to delete?"
    );
    if (result) {
      this.props.deleteAccount(this.props.currentUser.user.id);
      this.props.logout();
    }
  };

  render() {
    const togglePicker = () => {
      if (
        document.location.href ===
          "https://codinglog-v4-client.herokuapp.com/" ||
        document.location.href === "http://localhost:3000/"
      ) {
        return (
          <div className="color-picker-container">
            <label htmlFor="color-picker">Choose theme:</label>
            <input
              className="color-picker-box"
              type="color"
              name="color-picker"
              value={this.state.mainColor}
              onChange={this.changeTheme}
            ></input>
          </div>
        );
      } else {
        return (
          <div className="navbar-links">
            <Link to="/manual-list">Add Time</Link>
            <Link to="/languages">| Show Languages</Link>
          </div>
        );
      }
    };
    return (
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/">Home</Link>
          {this.props.currentUser.isAuthenticated && (
            <Link to="/" onClick={this.logout}>
              | Log Out
            </Link>
          )}
          {this.props.currentUser.isAuthenticated && (
            <a onClick={this.handleClickDelete}>| Delete Account</a>
          )}
        </div>
        <Link to="/" className="header-link">
          Codinglog v.4
        </Link>
        {this.props.currentUser.isAuthenticated && togglePicker()}
        {!this.props.currentUser.isAuthenticated && (
          <p>Sign in below to begin</p>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    theme: state.theme,
  };
}

export default withRouter(
  connect(mapStateToProps, { logout, deleteAccount, patchTheme, getTheme })(
    Navbar
  )
);
